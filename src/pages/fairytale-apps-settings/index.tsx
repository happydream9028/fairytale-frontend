import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { IApp } from "../../types/app";
import { Card, Row } from "react-bootstrap";
import FairyTaleTable from "../../components/fairytale-table";
import {
  useGetAppSettingsQuery,
  useCreateNewAppSettingMutation,
  useDeleteAppSettingMutation,
} from "../../redux/appQuery";
import { Trash } from "react-feather";
import FairyTaleAlert from "../../components/fairytale-alert";
import FairytaleFormComponent from "../../components/fairytale-form";
import fairytaleYup from "../../yup";
import { SETTINGS_CREATE_FORM_ATTRIBUTES } from "./constants";
import { ICreateSetting, ISetting } from "../../types/settings";
import FairytaleModal from "../../components/fairytale-modal";

interface ISettingsPageProps {
  app: IApp;
}
const AppSettingsPage: React.FC<ISettingsPageProps> = ({ app }) => {
  const { data: settings, isLoading, error } = useGetAppSettingsQuery(app.app_id);
  const [createNewAppSetting] = useCreateNewAppSettingMutation();
  const [deleteAppSetting] = useDeleteAppSettingMutation();

  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);

  const [pageTitle, setPageTitle] = useState<string>("Settings");
  const [showSpinner, setShowSpinner] = useState<boolean>(isLoading);
  const [alertVariant, setAlertVariant] = useState<"light" | "success" | "danger">("light");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalButtonText, setModalBUttonText] = useState<string>(tcommon("yes"));
  const [modalButtonNegText, setModalButtonNegText] = useState<string>(tcommon("cancel"));
  const [settingToDelete, setSettingToDelete] = useState<ISetting>();

  const SETTINGS_CREATE_SCHEMA = fairytaleYup.object().shape({
    key: fairytaleYup.string(),
    value: fairytaleYup.string(),
  });

  const SETTINGS_TABLE_COLUMNS: Column<Record<string, any>>[] = React.useMemo(
    () => [
      {
        Header: "settingName",
        id: "key",
        Cell: ({ row }: { row: any }) => {
          let { key } = row.original;
          return key;
        },
      },
      {
        Header: "settingValue",
        id: "value",
        Cell: ({ row }: { row: any }) => {
          let { value } = row.original;
          return value;
        },
      },
      {
        Header: tpagetexts("deleteSetting"),
        id: "actions",
        Cell: ({ row }: { row: any }) => (
          <span>
            <Trash
              className="align-middle mx-2 cursor-pointer"
              size={18}
              data-cy={`setting-list-actions-delete-${row.index}`}
              onClick={() =>
                _handleShowModalAndSetSeetingToDelete(
                  `${tpagetexts("deleteSettingFor")}${row.original.key}?`,
                  `${tpagetexts("deleteSettingFor")}${row.original.key}`,
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

  const _handleSubmit = async (values: ICreateSetting, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
    const result = (await createNewAppSetting({ appId: app.app_id, setting: values })) as { data: any };
    if (result.data === null) {
      setAlertVariant("success");
      setAlertMessage(tforms("feedCreateSuccess"));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      resetForm();
    } else {
      // @ts-ignore
      const message = result.error.data.message;
      setStatus({ success: false });
      setErrors({ submit: message });
      setSubmitting(false);
      setAlertVariant("danger");
      setAlertMessage(tforms("somethingWentWrong"));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const _handleShowModalAndSetSeetingToDelete = (message: string, heading: string, setting: ISetting) => {
    setModalMessage(message);
    setModalHeading(heading);
    setShowModal(true);
    setShowSpinner(true);
    setSettingToDelete(setting);
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

  const _handleDeleteSetting = async (settingToDelete: ISetting) => {
    try {
      await deleteAppSetting({ appId: app.app_id, settingId: settingToDelete.id });
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
          data-cy="ads-table-main"
          columns={SETTINGS_TABLE_COLUMNS}
          data={isLoading ? [] : settings}
          showHeader={true}
          mainTitle={tpagetexts("settingsFor") + app.app_title}
          subtitle={`${isLoading ? 0 : settings.length} Settings`}
          useSearchFilter={false}
          selectOptions={[
            {
              value: app.app_title,
              label: app.app_title,
            },
          ]}
          onChangeSelect={null}
        />
      </Row>
      <Row>
        <Card>
          <Card.Title>
            <p className="m-4">{tpagetexts("createSettingTitle")}</p>
          </Card.Title>
          <Card.Body>
            <FairytaleFormComponent
              formProps={SETTINGS_CREATE_FORM_ATTRIBUTES}
              editMode={false}
              onSubmit={_handleSubmit}
              formSchema={SETTINGS_CREATE_SCHEMA}
              initialFormValues={{
                key: "",
                value: "",
              }}
            />
            <FairyTaleAlert
              variant={alertVariant}
              message={tpagetexts(alertMessage)}
              heading=""
              show={showAlert}
              name="feed-create"
            />
          </Card.Body>
        </Card>
      </Row>
      <FairytaleModal
        showModal={showModal}
        onHideModal={_handleCloseModal}
        modalHeading={modalHeading}
        modalMessage={modalMessage}
        onClickNegativeButton={_handleCloseModal}
        onClickPositveButton={() => _handleDeleteSetting(settingToDelete as ISetting)}
        modalButtonTextPositive={modalButtonText}
        modalButtonTextNegative={modalButtonNegText}
        name="feeds"
      />
    </>
  );
};

export default AppSettingsPage;
