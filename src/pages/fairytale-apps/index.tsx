import React, { useState, useMemo, useCallback } from "react";

import { Col } from "react-bootstrap";
import { Eye, Trash } from "react-feather";
import FairyTaleTable from "../../components/fairytale-table";
import DataError from "../../components/DataError";
import { Column } from "react-table";
import FairytaleModal from "../../components/fairytale-modal";
import Loader from "../../components/Loader";
import FairyTaleAlert from "../../components/fairytale-alert";

import useFairyTaleClubAppsCrudHooks from "../../hooks/useFairyTaleClubAppsCrudHooks";
import { IApp } from "../../types/app";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const FairytaleApps = () => {
  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { apps, isLoading, error, deleteApp } = useFairyTaleClubAppsCrudHooks();
  const [show, setShow] = useState<boolean>(false);
  // @ts-ignore
  const [rowData, setRowData] = useState<IApp>(null);
  const [rowId, setRowId] = useState<number>(0);
  const [onEditError, setOnEditError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalButtonText, setModalBUttonText] = useState<string>(tcommon("yes"));
  const [modalButtonNegText, setModalButtonNegText] = useState<string>(tcommon("cancel"));
  const [componentState, setComponentState] = useState<"viewing" | "editing" | "deleting">("viewing");
  const navigate = useNavigate();

  const _handleCloseModal = () => {
    setModalMessage("");
    setModalHeading("");
    setShowModal(false);
  };

  const _handleShowModal = useCallback(
    (message: string, heading: string, rowValues: IApp, rowId: number) => {
      const presentStateOfComponent = componentState;
      if (presentStateOfComponent === "editing") {
        setModalMessage(message);
        setModalHeading(heading);
        setShowModal(true);
      } else {
        setComponentState("deleting");
        setModalMessage(message);
        setModalHeading(heading);
        setRowId(rowId);
        setRowData(rowValues);
        setShowModal(true);
      }
    },
    [componentState]
  );

  /*Sets show false so the component renders the App list */
  const _handleClose = () => {
    setComponentState("viewing");
    setShow(false);
  };

  /*Sets show true so the component renders the App details*/
  const _handleShow = (rowValues: IApp, rowId: number) => {
    setComponentState("editing");
    setOnEditError(false);
    setRowId(rowId);
    setRowData(rowValues);
    setShow(true);
  };

  const _handleDeleteApp = async (rowData: IApp) => {
    const deleteOperationResult = await deleteApp(rowData);
    // @ts-ignore
    if (deleteOperationResult.error) {
      setModalMessage(tforms("somethingWentWrong"));
      setTimeout(() => setShowModal(false), 3000);
    } else {
      setModalBUttonText(tcommon("continue"));
      setModalMessage(tforms("appDeleted"));
      setComponentState("viewing");
      setTimeout(() => setShowModal(false), 3000);
    }
  };

  // @ts-ignore
  const APPS_TABLE_COLUMNS: Column<Record<string, unknown>>[] = useMemo(
    () => [
      {
        id: "app_title",
        Header: "app_title",
        Cell: ({ row }: { row: any }) => {
          let { app_title } = row.original;
          return app_title;
        },
      },
      {
        id: "app_store_id",
        Header: "app_store_id",
        Cell: ({ row }: { row: any }) => {
          let { app_store_id } = row.original;
          return app_store_id;
        },
      },
      {
        id: "status",
        Header: "Status",
        Cell: ({ row }: { row: any }) => {
          let { deleted } = row.original;
          return deleted ? tcommon("no") : tcommon("yes");
        },
      },
      {
        id: "action-1",
        Header: "Actions",
        Cell: ({ row }: { row: any }) => {
          return (
            <>
              <span>
                <Eye
                  className="align-middle mx-3 cursor-pointer"
                  size={18}
                  data-cy={`apps-list-actions-edit-${row.index}`}
                  onClick={() => navigate(`/private/apps/list/${row.original.app_id}`)}
                />
              </span>
              <span>
                <Trash
                  className="align-middle mx-6 cursor-pointer"
                  size={18}
                  data-cy={`apps-list-actions-delete-${row.index}`}
                  onClick={() =>
                    _handleShowModal(
                      `${tforms("areYouSureApp")} ${row.original["app_title"]}`,
                      `${tforms("deleteApp")} ${row.original["app_title"]}`,
                      row.original,
                      row.original.app_id
                    )
                  }
                />
              </span>
            </>
          );
        },
      },
    ],
    [_handleShowModal, tforms]
  );

  if (error) {
    return <DataError />;
  }

  return (
    <React.Fragment>
      <Col>
        <FairyTaleTable
          data-cy="apps-table-main"
          columns={APPS_TABLE_COLUMNS}
          data={isLoading ? [] : apps}
          showHeader={true}
          mainTitle="Apps"
          subtitle={tpagetexts("appsSubTitle")}
          useSearchFilter={true}
        >
          <FairyTaleAlert show={isLoading} variant="light">
            <Loader />
          </FairyTaleAlert>
        </FairyTaleTable>
      </Col>
      <FairytaleModal
        showModal={showModal}
        onHideModal={_handleCloseModal}
        modalHeading={modalHeading}
        modalMessage={modalMessage}
        onClickNegativeButton={_handleCloseModal}
        onClickPositveButton={
          componentState === "deleting" ? () => _handleDeleteApp(rowData) : () => _handleCloseModal()
        }
        modalButtonTextPositive={modalButtonText}
        modalButtonTextNegative={modalButtonNegText}
        name="apps-modal"
      />
    </React.Fragment>
  );
};

export default FairytaleApps;
