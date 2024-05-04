import React, { useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FairytaleFormComponent from "../../components/fairytale-form";
import fairytaleYup from "../../yup";
import {  useUpdateWeatherByAppIdMutation } from "../../redux/appQuery";
import FairyTaleAlert from "../../components/fairytale-alert"; 

import { IWeather } from "../../types/weather";
import { WEATHER_FORM_ATTRIB_DATA } from "./constants";
import { IApp } from "../../types/app";
import { t } from "i18next";

interface IWeatherDetailProps {
  app: IApp;
  weather: IWeather; 
}

const WeatherDetailsView: React.FC<IWeatherDetailProps> = ({ app, weather }) => {
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tforms } = useTranslation(["formFields"]);
  const [updateWeatherByAppId] = useUpdateWeatherByAppIdMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(true) 
  const [msgError, setMsgError] = useState('error')

  const WEATHER_SCHEMA = fairytaleYup.object().shape({
    edit_place: fairytaleYup.string(),
    edit_latitude: fairytaleYup.string(),
    edit_longitude: fairytaleYup.string(),
  });


  const WEATHER_EDIT_FORM_ATTRIB_DATA = WEATHER_FORM_ATTRIB_DATA.map((field) => {
    return { ...field, name: `edit_${field.name}` };
  });

  const getIntegrationTypeOptions = () => {
    const options =  [];

    options.push({ value: 0, label: tcommon("select") });
    return options;
  };
 
  const initialValues = {
    id: weather.id,
    edit_place: weather.place,
    edit_latitude: weather.latitude,
    edit_longitude: weather.longitude
  };

  const _handleSubmit = async (values: any, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
 
    const editData = { 
      app_id: app.app_id,
      place: values.edit_place,
      latitude: values.edit_latitude ? Number(values.edit_latitude) : 0,
      longitude: values.edit_longitude ? Number(values.edit_longitude) : 0,
    };

    const { data, error } = (await updateWeatherByAppId({weatherId: values.id, body: editData})) as {
      data: any;
      error: any
    };
    
    if (!error) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 10000);
    } else {
      // @ts-ignore 
      const message = error.data.message.length > 0 ? error.data.message[0] : '' ||  t("somethingWentWrong");
      
      setStatusSuccess(false)
      setShowAlert(true);
      setTimeout(() => {
        setStatusSuccess(true)
        setShowAlert(false)
      }, 10000);
      setErrors({ submit: message });
      setMsgError(message)
      
      return; 
    }
  };

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title className="mb-0">{tpagetexts("weatherDetailHeader")}</Card.Title>
              </Card.Header>
              <Card.Body>
                <FairyTaleAlert
                  variant={statusSuccess ? "success" : "danger"}
                  message={statusSuccess ? tcommon("updated") : msgError}
                  heading=""
                  show={showAlert}
                  name="message-create"
                />
                <FairytaleFormComponent
                  formProps={WEATHER_EDIT_FORM_ATTRIB_DATA}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  formSchema={WEATHER_SCHEMA}
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

export default WeatherDetailsView;
