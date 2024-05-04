import React, { useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import FairytaleFormComponent from "../../components/fairytale-form";

import { useTranslation } from "react-i18next";
import { IAppCreate } from "../../types/app";
import FairyTaleAlert from "../../components/fairytale-alert";
import { FORM_ATTRIB_DATA, FORM_INITIAL_VALUES } from "./constants";
import useFairyTaleClubAppsCrudHooks from "../../hooks/useFairyTaleClubAppsCrudHooks";
import fairytaleYup from "../../yup";
import { useNavigate } from "react-router-dom";

const AppCreateNew = () => {
  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { createNewApp } = useFairyTaleClubAppsCrudHooks();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">("success");
  const navigate = useNavigate();

  const APP_CREATE_SCHEMA = fairytaleYup.object().shape({
    app_store_id: fairytaleYup.string().required(tforms("fieldIsRequired")), //?We need to fix this!!!
    /* .test({
       name: "contains.App",
       exclusive: true,
       message: tforms("appNameNotValid"),
       test: (value)=>value.includes(".app"),
     }).required(tforms("fieldIsRequired")),
   .test("", tforms("appNameNotValid"), (value) => {
     // @ts-ignore
     return value.endsWith(".app");
   })*/
    app_title: fairytaleYup.string().max(100).required(),
  });

  const _handleSubmit = async (values: IAppCreate, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
    const result = (await createNewApp(values)) as { data: any };
    if (result.data) {
      setShowAlert(true);
      setAlertVariant("success");
      setAlertMessage(tforms("appCreated"));
      setTimeout(() => setShowAlert(false), 10000);
      resetForm();
      navigate("/private/apps/list/all");
    } else {
      // @ts-ignore
      const message = typeof result.error.message === "string" ? result.error.message : tforms("somethingWentWrong");
      setAlertVariant("danger");
      setAlertMessage(message);
      setShowAlert(true);
      setStatus({ success: false });
      setErrors({ submit: message });
      setTimeout(() => setShowAlert(false), 10000);
      setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{tpagetexts("appPageSubtitle")}</h1>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <FairytaleFormComponent
                  formProps={FORM_ATTRIB_DATA}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  formSchema={APP_CREATE_SCHEMA}
                  initialFormValues={FORM_INITIAL_VALUES}
                />
                <FairyTaleAlert
                  variant={alertVariant}
                  message={alertMessage}
                  heading=""
                  show={showAlert}
                  name="app-create"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default AppCreateNew;
