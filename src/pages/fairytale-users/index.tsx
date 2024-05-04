import React, { useState, useMemo, useCallback, useEffect } from "react";

import { Col } from "react-bootstrap";
import { Eye, Trash } from "react-feather";
import FairyTaleTable from "../../components/fairytale-table";
import DataError from "../../components/DataError";
import { Column } from "react-table";
import FairytaleModal from "../../components/fairytale-modal";
import Loader from "../../components/Loader";
import FairyTaleAlert from "../../components/fairytale-alert";

import { useTranslation } from "react-i18next";
import { useGetUsersQuery, useDeleteUserMutation } from "../../redux/appQuery";
import { IUser, ICreateUser } from "../../types/user";
import UserDetailsView from "./UserDetailsView";

const FairytaleUsers = () => {
  const { t } = useTranslation(["formFields"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { data: users, isLoading, error } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation({});
  const [show, setShow] = useState<boolean>(false);
  // @ts-ignore
  const [rowData, setRowData] = useState<ICreateUser>(null);
  const [rowId, setRowId] = useState<number>(0);
  const [onEditError, setOnEditError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalHeading, setModalHeading] = useState<string>("Hello modal");
  const [modalButtonText, setModalBUttonText] = useState<string>(tcommon("yes"));
  const [modalButtonNegText, setModalButtonNegText] = useState<string>(tcommon("cancel"));
  const [componentState, setComponentState] = useState<"viewing" | "profile" | "deleting">("viewing");

  const formattedUsers: IUser[] = users?.map((user: IUser) => {
    return {
      email: user.email,
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      enable_integrations: user.enable_integrations,
      enable_app_settings: user.enable_app_settings,
      enable_feed_creation: user.enable_feed_creation,
      is_active: user.is_active,
      role: user.role ? user.role.id : -1,
      user_group: user.user_group ? user.user_group.group_id : -1,
    };
  });

  const _handleCloseModal = () => {
    setModalMessage("");
    setModalHeading("");
    setShowModal(false);
  };

  const _handleShowModal = useCallback((message: string, heading: string, rowValues: ICreateUser, rowId: number) => {
    setComponentState("deleting");
    setModalMessage(message);
    setModalHeading(heading);
    setRowId(rowId);
    setRowData(rowValues);
    setShowModal(true);
  }, []);

  /*Sets show false so the component renders the App list */
  const _handleClose = () => {
    setComponentState("viewing");
    setShow(false);
  };

  /*Sets show true so the component renders the App details*/
  const _handleShowProfile = (rowValues: ICreateUser, rowId: number) => {
    setComponentState("profile");
    setRowId(rowId);
    setRowData(rowValues);
    setShow(true);
  };

  const _handleDeleteUser = async (rowData: ICreateUser) => {
    const deleteOperationResult = (await deleteUser(rowData)) as { data: any };
    if (deleteOperationResult.data) {
      setModalBUttonText(t("continue"));
      setModalMessage(t("appDeleted"));
      setComponentState("viewing");
      setTimeout(() => setShowModal(false), 3000);
    } else {
      setModalMessage(t("somethingWentWrong"));
      setTimeout(() => setShowModal(false), 3000);
    }
  };

  // @ts-ignore
  const USERS_TABLE_COLUMNS: Column<Record<string, unknown>>[] = useMemo(
    () => [
      {
        id: "firstname",
        Header: "firstname",
        Cell: ({ row }: { row: any }) => {
          let { first_name } = row.original as IUser;
          return first_name;
        },
      },
      {
        id: "lastname",
        Header: "lastname",
        Cell: ({ row }: { row: any }) => {
          let { last_name } = row.original as IUser;
          return last_name;
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

  if (error) {
    return <DataError />;
  }

  return (
    <React.Fragment>
      <Col>
        <FairyTaleTable
          data-cy="users-table-main"
          columns={USERS_TABLE_COLUMNS}
          data={isLoading ? [] : formattedUsers}
          showHeader={true}
          mainTitle="Users"
          subtitle="usersListSubTitle"
          useSearchFilter={true}
        >
          <FairyTaleAlert show={isLoading} variant="light">
            <Loader />
          </FairyTaleAlert>
        </FairyTaleTable>
      </Col>
      <FairytaleModal showModal={show} onHideModal={_handleClose} name="user-details-modal">
        <UserDetailsView user={rowData} />
      </FairytaleModal>
      <FairytaleModal
        showModal={showModal}
        onHideModal={_handleCloseModal}
        modalHeading={modalHeading}
        modalMessage={modalMessage}
        onClickNegativeButton={_handleCloseModal}
        onClickPositveButton={
          componentState === "deleting" ? () => _handleDeleteUser(rowData) : () => _handleCloseModal()
        }
        modalButtonTextPositive={modalButtonText}
        modalButtonTextNegative={modalButtonNegText}
        name="user-delete-modal"
      />
    </React.Fragment>
  );
};

export default FairytaleUsers;
