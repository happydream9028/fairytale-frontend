import React, { useCallback, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { Eye, Trash } from "react-feather";
import FairyTaleTable from "../../components/fairytale-table";
import AppSwitch from "../../components/AppSwitch";
import Loader from "../../components/Loader";
import FairytaleModal from "../../components/fairytale-modal";
import FairyTaleAlert from "../../components/fairytale-alert";
import { Column } from "react-table";

import { Feed, IFairytaleFeedPage, IFeed, IFeedUpdate } from "../../types/feed";
import { useTranslation } from "react-i18next";
import useFairyTaleClubFeedsCrudHooks from "../../hooks/useFairyTaleClubFeedsCrudHooks";
import FeedDetailsView from "./FeedDetailsView";

const FairytaleFeedPage: React.FC<IFairytaleFeedPage> = ({ app, feeds }) => {
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [appName, setAppName] = useState<string>("");
  const [feedToDelete, setFeedToDelete] = useState<Feed | any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalHeading, setModalHeading] = useState<string>("");
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [modalButtonText, setModalBUttonText] = useState<string>(tcommon("yes"));
  const [modalButtonNegText, setModalButtonNegText] = useState<string>(tcommon("cancel"));
  const { editAppFeed, deleteAppFeed } = useFairyTaleClubFeedsCrudHooks(app.app_id);
  const [rowData, setRowData] = useState<IFeed | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [componentState, setComponentState] = useState<"viewing" | "feed" | "deleting">("viewing");

  const _handleSwitchValueChange = useCallback(
    async (
      event: React.FormEvent<HTMLInputElement>,
      rowValues: IFeed,
      initialCellValue: boolean,
      columnName: keyof IFeed
    ) => {
      setShowSpinner(true);
      const newCellValue: boolean = event.currentTarget.checked;
      const {
        integration,
        name,
        push_title,
        push_notification_enabled,
        push_content,
        enabled,
        app_id,
        feed_id,
        show_in_news,
      } = rowValues;
      let change: IFeedUpdate = {
        name: name,
        push_title: push_title,
        push_content: push_content,
        enabled: enabled,
        push_notification_enabled: push_notification_enabled,
        app_id: app_id,
        owner: integration.owner,
        apikey: integration.apikey,
        url: integration.url,
        is_alive: integration.is_alive,
        integration_type: integration.integration_type.id,
        icon_url: integration.icon_url,
        custom_icon_url: integration.custom_icon_url,
        feed_id: feed_id,
        show_in_news: show_in_news,
      };
      // @ts-ignore
      change[columnName] = newCellValue;
      try {
        await editAppFeed(change);
        setShowSpinner(false);
      } catch (error) {
        _handleShowModal("Unexpected error! Try again soon", "Unexpected Error");
      }
    },
    [editAppFeed]
  );

  /*Sets show true so the component renders the App details*/
  const _handleShowFeed = (rowValues: IFeed, rowId: number) => {
    setComponentState("feed");
    setRowData(rowValues);
    setShowDetailModal(true);
  };

  /*Sets show false so the component renders the App list */
  const _handleClose = () => {
    setComponentState("viewing");
    setShowDetailModal(false);
  };

  const FEEDS_TABLE_COLUMNS: Column<Record<string, unknown>>[] = React.useMemo(
    () => [
      {
        Header: tpagetexts("feedName"),
        accessor: "name",
      },
      {
        Header: tpagetexts("status"),
        id: "enabled",
        Cell: ({ row }: { row: any }) => {
          let rowValue: IFeed = row.original;
          return (
            <span>
              <AppSwitch
                checked={rowValue["enabled"]}
                name={"enabled"}
                labelTextTrue={tcommon("enabled")}
                labelTextFalse={tcommon("disabled")}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  _handleSwitchValueChange(event, rowValue, rowValue["enabled"], "enabled")
                }
              />
            </span>
          );
        },
      },
      {
        Header: tpagetexts("pushStatus"),
        id: "pushStatus",
        Cell: ({ row }: { row: any }) => {
          return (
            <span>
              <AppSwitch
                checked={row.original["push_notification_enabled"]}
                name={"push_notification_enabled"}
                labelTextTrue={tcommon("enabled")}
                labelTextFalse={tcommon("disabled")}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  _handleSwitchValueChange(
                    event,
                    row.original,
                    row.original["push_notification_enabled"],
                    "push_notification_enabled"
                  )
                }
              />
            </span>
          );
        },
      },
      {
        Header: tpagetexts("deleteFeed"),
        id: "actions",
        Cell: ({ row }: { row: any }) => (
          <span>
            <Eye
              className="align-middle mx-3 cursor-pointer"
              size={18}
              data-cy={`users-list-actions-edit-${row.index}`}
              onClick={() => _handleShowFeed(row.original, row.original.user_id)}
            />
            <Trash
              className="align-middle mx-2 cursor-pointer"
              size={18}
              data-cy={`Feed-list-actions-delete-${row.index}`}
              onClick={() =>
                _handleShowModalAndDeleteFeedData(
                  `Delete Feed ${row.original.name}?`,
                  `Delete feed ${row.original.name}`,
                  row.original
                )
              }
            />
          </span>
        ),
      },
    ],
    [_handleSwitchValueChange, tpagetexts, tcommon]
  );

  const _handleShowModalAndDeleteFeedData = async (message: string, heading: string, rowValues: Feed) => {
    setModalMessage(message);
    setModalHeading(heading);
    setShowModal(true);
    setShowSpinner(true);
    setFeedToDelete(rowValues);
  };

  const _handleShowModal = (message: string, heading: string) => {
    setModalMessage(message);
    setModalHeading(heading);
    setShowModal(true);
  };
  const _handleCloseModal = () => {
    setModalMessage("");
    setModalHeading("");
    setShowModal(false);
    if (showSpinner) setShowSpinner(false);
  };

  const _handleDeleteFeed = async (feedToDelete: Feed) => {
    try {
      await deleteAppFeed(feedToDelete);
      setShowSpinner(false);
      _handleCloseModal();
    } catch (error) {
      _handleShowModal("Unexpected error! Try again soon", "Unexpected Error");
    }
  };

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3" data-cy="feeds-main-heading-text">
          {`${tpagetexts("feedsListPageHeaderText")} ${appName}`}
        </h1>
        <Row>
          <Col>
            <FairyTaleTable
              data-cy="feeds-table-main"
              columns={FEEDS_TABLE_COLUMNS}
              data={feeds}
              showHeader={true}
              mainTitle=""
              subtitle={`${tcommon("thereAre")} ${feeds.length} ${tpagetexts("feeds")} ${
                selectedOption !== 0 ? tcommon("for") + " " + appName : ""
              }`}
              useSearchFilter={true}
              selectOptions={[
                {
                  value: app.app_title,
                  label: app.app_title,
                },
              ]}
              onChangeSelect={null}
            />
            <FairyTaleAlert show={showSpinner} variant="light">
              <Loader />
            </FairyTaleAlert>
          </Col>
        </Row>
        <FairytaleModal showModal={showDetailModal} onHideModal={_handleClose} name="user-details-modal">
          <FeedDetailsView feed={rowData as IFeed} owner={app.user_group?.group_id} />
        </FairytaleModal>
        <FairytaleModal
          showModal={showModal}
          onHideModal={_handleCloseModal}
          modalHeading={modalHeading}
          modalMessage={modalMessage}
          onClickNegativeButton={_handleCloseModal}
          onClickPositveButton={() => _handleDeleteFeed(feedToDelete)}
          modalButtonTextPositive={modalButtonText}
          modalButtonTextNegative={modalButtonNegText}
          name="feeds"
        />
      </Container>
    </React.Fragment>
  );
};

export default FairytaleFeedPage;
