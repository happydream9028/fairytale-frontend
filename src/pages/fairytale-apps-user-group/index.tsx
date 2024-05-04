import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { Card, Row } from "react-bootstrap";
import FairyTaleTable from "../../components/fairytale-table";
import { 
  useCreateNewUserGroupMutation, 
  useDeleteUserGroupMutation,  
  useGetAppsQuery,  
  useGetUserGroupsQuery, 
} from "../../redux/appQuery";
import { Eye, Trash } from "react-feather";  
import FairytaleModal from "../../components/fairytale-modal"; 
import FairytaleFormComponent from "../../components/fairytale-form"; 
import FairyTaleAlert from "../../components/fairytale-alert";
import fairytaleYup from "../../yup";
import { IUserGroup, USER_GROUP_CREATE_FORM_ATTRIBUTES } from "./constants";
import UserGroupDetailsView from "./UserGroupDetailsView";
import { IApp } from "../../types/app";

interface IUserGroupsPageProps { 
}
const AppUserGroupPage: React.FC<IUserGroupsPageProps> = () => {
  const { data: groups, isLoading, error } = useGetUserGroupsQuery({});
  const { data: apps } = useGetAppsQuery({})
  const [deleteUserGroup] = useDeleteUserGroupMutation();
  const [createNewUserGroup] = useCreateNewUserGroupMutation();

  const [pageTitle, setPageTitle] = useState<string>("User groups");

  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const [alertVariant, setAlertVariant] = useState<"light" | "success" | "danger">("light");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [rowData, setRowData] = useState<IUserGroup | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalHeading, setModalHeading] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(isLoading);
  const [userGroupToDelete, setUserGroupToDelete] = useState<IUserGroup>();
  const [modalButtonText, setModalBUttonText] = useState<string>(tcommon("yes"));
  const [modalButtonNegText, setModalButtonNegText] = useState<string>(tcommon("cancel"));
 
  const USER_GROUP_CREATE_SCHEMA = fairytaleYup.object().shape({
    name: fairytaleYup.string(),
    app: fairytaleYup.string()
  });

  const _handleShowUserGroups = (rowValues: IUserGroup) => {
    setRowData(rowValues);
    setShowDetailModal(true);
  };

  const _handleClose = () => { 
    setShowDetailModal(false);
  };

  const getAppUserGroupOptions = () => {
    const options = apps
    ? apps.map((type: IApp) => {
        return { value: type.app_id, label: type.app_title };
      })
    : [];
 
    return options;
  };

  const USER_GROUPS_TABLE_COLUMNS: Column<Record<string, any>>[] = React.useMemo(
    () => [
      {
        Header: "Group name",
        id: "key",
        Cell: ({ row }: { row: any }) => {
          let { group_name } = row.original; 
          return group_name;
        },
      }, 
      {
        Header: 'Actions',
        id: "actions",
        Cell: ({ row }: { row: any }) => (
          <span>
               <Eye
                className="align-middle mx-3 cursor-pointer"
                size={18}
                data-cy={`users-group-list-actions-edit-${row.index}`}
                onClick={() => _handleShowUserGroups(row.original)}
              />
            <Trash
              className="align-middle mx-2 cursor-pointer"
              size={18}
              data-cy={`setting-list-actions-delete-${row.index}`}
              onClick={() =>
                _handleShowModalAndSetUserGroupToDelete(
                  `${tpagetexts("deleteUserGroupFor")}${row.original.group_name}?`,
                  `${tpagetexts("deleteUserGroupFor")}${row.original.group_name}`,
                  row.original
                )
              }
            />
          </span>
        ),
      },
    ],
    []
  );
 
  const _handleSubmit = async (values: any, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
    const result = (await createNewUserGroup({ 
      group_name: values.name,  
      app: values.app
    })) as { data: any };

    console.log(result);
    
    if (result.data === null) {
      setAlertVariant("success");
      setAlertMessage(tforms("userGroupCreateSuccess"));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      resetForm();
    } else {
      // @ts-ignore
      const message = result.error.data.message;
      console.log('message', message);
      
      setStatus({ success: false });
      setErrors({ submit: message });
      setSubmitting(false);
      setAlertVariant("danger");
      setAlertMessage(message);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  
  const _handleShowModalAndSetUserGroupToDelete = (message: string, heading: string, userGroup: IUserGroup) => {
    setModalMessage(message);
    setModalHeading(heading);
    setShowModal(true);
    setShowSpinner(true);
    setUserGroupToDelete(userGroup);
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

  const _handleDeletUserGroup = async (body: IUserGroup) => {
    try {
      await deleteUserGroup(body.group_id);
      setShowSpinner(false);
      _handleCloseModal();
    } catch (error) {
      _handleShowModal(tforms("requestError"), tforms("requestErrorHeading"));
    }
  };

  return (
    <>
      <h1 className="h3 mb-3">{pageTitle}</h1>
      <Row>
        <FairyTaleTable
          data-cy="user-groups-table-main"
          columns={USER_GROUPS_TABLE_COLUMNS}
          data={isLoading ? [] : groups}
          showHeader={true} 
          useSearchFilter={true}
          mainTitle="User-groups"
          subtitle={'all user-groups'}  
        />
      </Row>
      <Row>
        <Card>
          <Card.Title>
            <p className="m-4">{tpagetexts("createUserGroupsTitle")}</p>
          </Card.Title>
          <Card.Body>
            <FairytaleFormComponent
              formProps={USER_GROUP_CREATE_FORM_ATTRIBUTES}
              editMode={false}
              onSubmit={_handleSubmit}
              formSchema={USER_GROUP_CREATE_SCHEMA}
              initialFormValues={{
                name: "", 
                app: ''
              }}
              selectValues={{ app: getAppUserGroupOptions() }}
            />,
            <FairyTaleAlert
              variant={alertVariant}
              message={tpagetexts(alertMessage)}
              heading=""
              show={showAlert}
              name="user-group-create"
            />
          </Card.Body>
        </Card>
      </Row>
      <FairytaleModal showModal={showDetailModal} onHideModal={_handleClose} name="user-groups-details-modal">
          <UserGroupDetailsView userGroup={rowData as IUserGroup} />
        </FairytaleModal> 
      <FairytaleModal
        showModal={showModal}
        onHideModal={_handleCloseModal}
        modalHeading={modalHeading}
        modalMessage={modalMessage}
        onClickNegativeButton={_handleCloseModal}
        onClickPositveButton={() => _handleDeletUserGroup(userGroupToDelete as IUserGroup)}
        modalButtonTextPositive={modalButtonText}
        modalButtonTextNegative={modalButtonNegText}
        name="userGroup"
      />
    </>
  );
};

export default AppUserGroupPage;
