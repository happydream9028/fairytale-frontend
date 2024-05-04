import React, { useEffect, useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import SelectFilter from "../../components/fairytale-table/SelectFilter";
import FairyTaleAlert from "../../components/fairytale-alert";
import FairytaleFormComponent from "../../components/fairytale-form";

import { useTranslation } from "react-i18next";

import useFairyTaleClubFeedsCrudHooks from "../../hooks/useFairyTaleClubFeedsCrudHooks";
import { ICreateFeedComponentProps, IFeedCreate } from "../../types/feed";
import { FEED_FORM_ATTRIB_DATA } from "./constants";
import fairytaleYup from "../../yup";

const CreateNewFeed: React.FC<ICreateFeedComponentProps> = ({ app, selectValues }) => {
  const { t: tforms } = useTranslation(["formFields"]);

  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { createNewAppFeed } = useFairyTaleClubFeedsCrudHooks(app.app_id);
  const [alertVariant, setAlertVariant] = useState<"light" | "success" | "danger">("light");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const FEED_SCHEMA = fairytaleYup.object().shape({
    push_content: fairytaleYup.string(),
    push_title: fairytaleYup.string(),
    url: fairytaleYup.string().required(tforms("fieldIsRequired")),
    feed_name: fairytaleYup.string().required(tforms("fieldIsRequired")),
    integration_type: fairytaleYup.string().required(tforms("fieldIsRequired")),
    icon_url: fairytaleYup.string(),
  });

  const _handleSubmit = async (values: IFeedCreate, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
    values.integration_type = Number(values.integration_type);
    values.name = values.feed_name;
    values.owner = app.user_group.group_id;
    const result = (await createNewAppFeed(values)) as { data: any };
    if (result.data) {
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

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{tpagetexts("feedPageCreateTitle")}</h1>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <p className="mb-0"></p>
              </Card.Header>
              <Card.Body>
                <FairytaleFormComponent
                  formProps={FEED_FORM_ATTRIB_DATA}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  formSchema={FEED_SCHEMA}
                  selectValues={selectValues}
                  initialFormValues={{
                    name: "",
                    feed_name: "",
                    push_title: "",
                    push_content: "",
                    enabled: false,
                    push_notification_enabled: false,
                    app_id: app.app_id,
                    owner: app.user_group?.group_id,
                    apikey: "",
                    url: "",
                    is_alive: true,
                    integration_type: 0, //? this should be integration_id not type
                    icon_url: "",
                    custom_icon_url: "",
                    show_in_news: true,
                    show_in_comm_comp: true,
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
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default CreateNewFeed;
