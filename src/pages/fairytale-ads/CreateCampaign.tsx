import React, { useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";

import { useTranslation } from "react-i18next";
import { IApp } from "../../types/app";
import FairyTaleAlert from "../../components/fairytale-alert";
import { FORM_INITIAL_VALUES, CREATE_FORM_ATTRIB_DATA } from "./constants";
import FairytaleFormComponent from "../../components/fairytale-form";
import { Campaign } from "../../types/ads";
import useFairyTaleClubAdsCrudHooks from "../../hooks/useFairyTaleClubAppAdsCrudHooks";
import fairytaleYup from "../../yup";

const CreateNewCampaign = ({ app }: { app: IApp }) => {
  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { createAppCampaign } = useFairyTaleClubAdsCrudHooks(app.app_id);
  const [alertVariant, setAlertVariant] = useState<"light" | "success" | "danger">("light");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const CAMPAIGN_SCHEMA = fairytaleYup.object().shape({
    description: fairytaleYup.string().required(tforms("fieldIsRequired")),
    title: fairytaleYup.string().required(tforms("fieldIsRequired")),
    ad_duration: fairytaleYup.string().required(tforms("fieldIsRequired")),
  });
  const _handleSubmit = async (values: Campaign, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
    values.ad_duration = Number(values.ad_duration);
    values.app_id = app.app_id;
    const result = (await createAppCampaign(values)) as { data: any };
    if (result.data) {
      setAlertVariant("success");
      setAlertMessage(tforms("feedCreateSuccess"));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      resetForm();
    } else {
      // @ts-ignore
      const message = result.error || t("somethingWentWrong");
      setStatus({ success: false });
      setErrors({ submit: message });
      setSubmitting(false);
      setAlertVariant("danger");
      setAlertMessage(tforms("somethingWentWrong"));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
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
                  formProps={CREATE_FORM_ATTRIB_DATA}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  formSchema={CAMPAIGN_SCHEMA}
                  initialFormValues={FORM_INITIAL_VALUES}
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
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default CreateNewCampaign;
