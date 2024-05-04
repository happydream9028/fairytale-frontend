import React, { useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import FairyTaleAlert from "../../components/fairytale-alert";
import FairytaleFormComponent from "../../components/fairytale-form";

import { useTranslation } from "react-i18next";

import { IApp, IAppDataEditFormComponentProps } from "../../types/app";
import useFairyTaleClubAppsCrudHooks from "../../hooks/useFairyTaleClubAppsCrudHooks";
import { FORM_ATTRIB_DATA } from "./constants";

import fairytaleYup from "../../yup";

const AppDataEditForm = ({ formData }: IAppDataEditFormComponentProps) => {
  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { editApp } = useFairyTaleClubAppsCrudHooks();
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState<"success" | "danger" | "light">("light");

  const APP_EDIT_SCHEMA = fairytaleYup.object().shape({
    app_store_id: fairytaleYup
      .string()
      .test("", tforms("appNameNotValid"), (value) => {
        // @ts-ignore
        return value.endsWith(".app");
      })
      .required(tforms("fieldIsRequired")),
    app_title: fairytaleYup.string().max(100).required(),
  });
  const _handleSubmitForm = async (formValues: IApp) => {
    let appObjectBeforeEdit = { ...formData };
    let { app_store_id, app_title, user_group, in_app_message } = { ...formValues };
    let appObjectForApiRequest = {
      app_store_id: app_store_id,
      app_title: app_title,
      app_owner_group: user_group?.group_id,
      in_app_message: in_app_message,
    };
    const editAppOps = await editApp({ app: appObjectForApiRequest, app_id: appObjectBeforeEdit.app_id });
    // @ts-ignore
    if (!editAppOps.error) {
      setAlertVariant("success");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 10000);
    } else {
      setAlertVariant("danger");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 10000);
    }
  };

  const FORM_INITIAL_VALUES: IApp = {
    app_title: formData.app_title,
    app_store_id: formData.app_store_id,
    deleted: false,
    user_group: {
      group_id: 0,
      group_name: "",
    },
    app_id: formData.app_id,
    push_notification_tag: formData.push_notification_tag,
    in_app_message: formData.in_app_message,
  };

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <h3 className="h3 mb-3">{`${tpagetexts("editInProgress")} ${
          formData.app_title ? formData.app_title : ""
        } ${tpagetexts("lowercaseApp")}`}</h3>
        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <FairytaleFormComponent
                  formProps={FORM_ATTRIB_DATA}
                  editMode={true}
                  onSubmit={_handleSubmitForm}
                  formSchema={APP_EDIT_SCHEMA}
                  initialFormValues={FORM_INITIAL_VALUES}
                />
                <FairyTaleAlert
                  variant={alertVariant}
                  message={tforms("appCreated")}
                  heading=""
                  show={showAlert}
                  name="app-edit"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default AppDataEditForm;
