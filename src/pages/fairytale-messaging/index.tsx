import React, { useState, useMemo, useCallback, ChangeEvent, useEffect } from "react";

import { Col } from "react-bootstrap";
import { Eye, Trash } from "react-feather";
import FairyTaleTable from "../../components/fairytale-table";
import DataError from "../../components/DataError";
import { Column } from "react-table";
import FairytaleModal from "../../components/fairytale-modal";
import Loader from "../../components/Loader";
import FairyTaleAlert from "../../components/fairytale-alert";

import { useTranslation } from "react-i18next";
import { useGetMessagesQuery, useDeleteMessageMutation, useGetAppsQuery } from "../../redux/appQuery";
import { IMessage } from "../../types/message";
import moment from "moment";
import { IApp } from "../../types/app";
import MessageDetailsView from "./MessageDetailsView";

interface ICreateMessages {
  isUser?: boolean;
  app?: IApp;
}

const FairytaleMessages: React.FC<ICreateMessages> = ({ isUser = false, app }) => {
  const { t } = useTranslation(["formFields"]);
  const { t: tcommon } = useTranslation(["common"]);
  const [deleteMessage] = useDeleteMessageMutation({});
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  // @ts-ignore
  const [rowData, setRowData] = useState<IMessage>(null);
  const [rowId, setRowId] = useState<number>(0);
  const [onEditError, setOnEditError] = useState<boolean>(false);
  const [showDeleteModal, setShowDetailModalDeleteModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalHeading, setModalHeading] = useState<string>("Hello modal");
  const [modalButtonText, setModalBUttonText] = useState<string>(tcommon("yes"));
  const [modalButtonNegText, setModalButtonNegText] = useState<string>(tcommon("cancel"));
  const [componentState, setComponentState] = useState<"viewing" | "profile" | "deleting">("viewing");
  const { data: apps, isLoading: isAppsLoading, error: appsError } = useGetAppsQuery({});
  const [selectedApp, setSelectedApp] = useState<number>(-1);
  const { data: messages, isLoading, error } = useGetMessagesQuery({ appId: selectedApp, limit: 100 });
 
  const appSelectData = apps?.map((app: IApp) => {
    return { value: app.app_id, label: app.app_title };
  });

  useEffect(() => {
    if(isUser) {
      setSelectedApp(app?.app_id || -1)
    } else {

      if (apps && apps.length > 0) {
        setSelectedApp(apps[0].app_id);
      } 
    }
  }, [isUser, app, apps]);

  const _handleCloseModal = () => {
    setModalMessage("");
    setModalHeading("");
    setShowDetailModalDeleteModal(false);
  };

  const _handleShowModal = useCallback((message: string, heading: string, rowValues: IMessage, rowId: number) => {
    setComponentState("deleting");
    setModalMessage(message);
    setModalHeading(heading);
    setRowId(rowId);
    setRowData(rowValues);
    setShowDetailModalDeleteModal(true);
  }, []);

  /*Sets show false so the component renders the App list */
  const _handleClose = () => {
    setComponentState("viewing");
    setShowDetailModal(false);
  };

  /*Sets show true so the component renders the App details*/
  const _handleShowProfile = (rowValues: IMessage, rowId: number) => {
    setComponentState("profile");
    setRowId(rowId);
    setRowData(rowValues);
    setShowDetailModal(true);
  };

  const _handleDeleteMessage = async (rowData: IMessage) => {
    const deleteOperationResult = (await deleteMessage({ appId: selectedApp, messageId: rowData.message_id })) as {
      data: any;
    };
    if (deleteOperationResult.data) {
      setModalBUttonText(t("continue"));
      setModalMessage(t("appDeleted"));
      setComponentState("viewing");
      setTimeout(() => setShowDetailModalDeleteModal(false), 3000);
    } else {
      setModalMessage(t("somethingWentWrong"));
      setTimeout(() => setShowDetailModalDeleteModal(false), 3000);
    }
  };

  // @ts-ignore
  const USERS_TABLE_COLUMNS: Column<Record<string, unknown>>[] = useMemo(
    () => [
      {
        id: "message_title",
        Header: "Title",
        Cell: ({ row }: { row: any }) => {
          let { message_title } = row.original as IMessage;
          return message_title;
        },
      },
      {
        id: "message_type",
        Header: "Type",
        Cell: ({ row }: { row: any }) => {
          let { message_type } = row.original as IMessage;
          return message_type === 0 ? "Normal" : "Pop-up";
        },
      },
      {
        id: "pinned_until",
        Header: "Pinned Until",
        Cell: ({ row }: { row: any }) => {
          let { pinned_until } = row.original as IMessage;
          return pinned_until ? moment(pinned_until).format("YYYY-MM-DD HH:mm:ss") : '';
        },
      },
      {
        id: "actions",
        Header: "Actions",
        Cell: ({ row }: { row: any }) => {
          return (
            <span>
              <Eye
                className="align-middle mx-3 cursor-pointer"
                size={18}
                data-cy={`users-list-actions-edit-${row.index}`}
                onClick={() => _handleShowProfile(row.original, row.original.user_id)}
              />
              <Trash
                className="align-middle mx-3 cursor-pointer"
                size={18}
                data-cy={`users-list-actions-delete-${row.index}`}
                onClick={() =>
                  _handleShowModal(
                    `${t("areYouSureUser")} ${row.original["first_name"]}`,
                    `${t("userDeleted")} ${row.original["first_name"]}`,
                    row.original,
                    row.original.app_id
                  )
                }
              />
            </span>
          );
        },
      },
    ],
    [_handleShowModal, t]
  );

  if (error || appsError) {
    return <DataError />;
  }

  return (
    <React.Fragment>
      <Col>
        <FairyTaleTable
          data-cy="users-table-main"
          columns={USERS_TABLE_COLUMNS}
          data={isLoading ? [] : messages}
          showHeader={true}
          mainTitle="Messages"
          subtitle="messageListSubTitle"
          useSearchFilter={isUser}
          selectOptions={isAppsLoading ? [] : appSelectData}
          onChangeSelect={(event: ChangeEvent<HTMLSelectElement>) => {
            setSelectedApp(Number(event.target.value));
          }}
        >
          <FairyTaleAlert show={isLoading} variant="light">
            <Loader />
          </FairyTaleAlert>
        </FairyTaleTable>
      </Col>
      <FairytaleModal showModal={showDetailModal} onHideModal={_handleClose} name="user-details-modal">
        <MessageDetailsView message={rowData} appId={selectedApp} />
      </FairytaleModal>
      <FairytaleModal
        showModal={showDeleteModal}
        onHideModal={_handleCloseModal}
        modalHeading={modalHeading}
        modalMessage={modalMessage}
        onClickNegativeButton={_handleCloseModal}
        onClickPositveButton={
          componentState === "deleting" ? () => _handleDeleteMessage(rowData) : () => _handleCloseModal()
        }
        modalButtonTextPositive={modalButtonText}
        modalButtonTextNegative={modalButtonNegText}
        name="user-delete-modal"
      />
    </React.Fragment>
  );
};

export default FairytaleMessages;
