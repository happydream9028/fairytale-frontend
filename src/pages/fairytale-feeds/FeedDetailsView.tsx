import React, { useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { IFeedCreate, IFeed, IIntegrationType } from "../../types/feed";
import FairytaleFormComponent from "../../components/fairytale-form";
import fairytaleYup from "../../yup";
import { useEditAppFeedMutation } from "../../redux/appQuery";
import FairyTaleAlert from "../../components/fairytale-alert";
import { FEED_FORM_ATTRIB_DATA } from "./constants";
import useFairyTaleClubFeedsCrudHooks from "../../hooks/useFairyTaleClubFeedsCrudHooks";

interface IFeedDetailProps {
  feed: IFeed;
  owner: number;
}

const FeedDetailsView: React.FC<IFeedDetailProps> = ({ feed, owner }) => {
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tforms } = useTranslation(["formFields"]);
  const [editAppFeed] = useEditAppFeedMutation();
  const [showAlert, setShowAlert] = useState(false);
  const { integrationTypes } = useFairyTaleClubFeedsCrudHooks(feed.app_id);

  const FEED_SCHEMA = fairytaleYup.object().shape({
    edit_push_content: fairytaleYup.string(),
    edit_push_title: fairytaleYup.string(),
    edit_url: fairytaleYup.string().required(tforms("fieldIsRequired")),
    edit_feed_name: fairytaleYup.string().required(tforms("fieldIsRequired")),
    edit_integration_type: fairytaleYup.string().required(tforms("fieldIsRequired")),
    edit_icon_url: fairytaleYup.string(),
  });

  const FEED_EDIT_FORM_ATTRIB_DATA = FEED_FORM_ATTRIB_DATA.map((field) => {
    return { ...field, name: `edit_${field.name}` };
  });

 
  const initialValues = {
    edit_feed_name: feed.name,
    edit_push_title: feed.push_title,
    edit_push_content: feed.push_content,
    edit_enabled: feed.enabled,
    edit_push_notification_enabled: feed.push_notification_enabled,
    edit_app_id: feed.app_id,
    edit_owner: owner,
    edit_apikey: feed.integration.apikey,
    edit_url: feed.integration.url,
    edit_integration_type: feed.integration.integration_type.id,
    edit_icon_url: feed.integration.icon_url,
    edit_custom_icon_url: feed.integration.custom_icon_url,
    edit_show_in_news: feed.show_in_news,
    edit_show_in_comm_comp: feed.show_in_comm_comp,
  };

  const getIntegrationTypeOptions = () => {
    const options = integrationTypes
      ? integrationTypes.map((type: IIntegrationType) => {
          return { value: type.id, label: type.type_name };
        })
      : [];

    options.push({ value: 0, label: tcommon("select") });
    return options;
  };

  const _handleSubmit = async (values: any, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
    const editData = {
      feed_id: feed.feed_id,
      name: values.edit_feed_name,
      push_title: values.edit_push_title,
      push_content: values.edit_push_content,
      enabled: values.edit_enabled,
      push_notification_enabled: values.edit_push_notification_enabled,
      app_id: values.edit_app_id,
      owner: owner,
      apikey: values.edit_apikey,
      url: values.edit_url,
      integration_type: Number(values.edit_integration_type),
      icon_url: values.edit_icon_url,
      custom_icon_url: values.edit_custom_icon_url,
      feed_name: values.edit_feed_name,
      show_in_news: values.edit_show_in_news,
      show_in_comm_comp: values.edit_show_in_comm_comp,
    };

    const result = (await editAppFeed(editData)) as {
      data: any;
    };
    if (result.data) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 10000);
    } else {
      // @ts-ignore
      const message = result.error || t("somethingWentWrong");
      setStatus({ success: false });
      setErrors({ submit: message });
      setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title className="mb-0">{tpagetexts("feedDetailHeader")}</Card.Title>
              </Card.Header>
              <Card.Body>
                <FairyTaleAlert
                  variant="success"
                  message={tcommon("appCreated")}
                  heading=""
                  show={showAlert}
                  name="message-create"
                />
                <FairytaleFormComponent
                  formProps={FEED_EDIT_FORM_ATTRIB_DATA}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  formSchema={FEED_SCHEMA}
                  initialFormValues={initialValues}
                  selectValues={{ edit_integration_type: getIntegrationTypeOptions() }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default FeedDetailsView;
