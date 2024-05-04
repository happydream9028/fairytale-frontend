import React, { MouseEventHandler, useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FairytaleFormComponent from "../../components/fairytale-form";
import fairytaleYup from "../../yup";
import {  useCreateNewPartnerMutation, useUpdateWeatherByAppIdMutation } from "../../redux/appQuery";
import FairyTaleAlert from "../../components/fairytale-alert"; 

import { t } from "i18next";
import { PARTNER_FORM_ATTRIB_DATA } from "./constants";

interface IAddPartnerProps {
  groupId: string; 
  onSubmit: () => void
}

const AddDetailsView: React.FC<IAddPartnerProps> = ({ groupId, onSubmit }) => {
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tforms } = useTranslation(["formFields"]); 
  const [showAlert, setShowAlert] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(true) 
  const [msgError, setMsgError] = useState('error')
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createNewPartner] = useCreateNewPartnerMutation()
 
  const PARTNER_SCHEMA = fairytaleYup.object().shape({
    title: fairytaleYup.string(),
    url: fairytaleYup.string(), 
    image_url: fairytaleYup.string(),
  });

 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files ? files[0] : null;
  
    if(file) {
      setSelectedFile(file); 
    } 
  };
 
  const initialValues = { 
    title: '', 
    url: '',
    image_url: ''
  };

  const _handleSubmit = async (values: any, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
 
    const formData = new FormData();
    formData.append('partner_group_id', groupId)
    Object.entries(values).forEach(([key, value]) => {
      if (key  === 'formData') {
        return;
      }
     
     if (value !== null && value !== undefined) {
        // Convert other values to string representation.
        formData.append(key, String(value));
      }
    });
   
    if (selectedFile) {
      formData.append('file', selectedFile);
    } 
    
    const { data, error } = (await createNewPartner({body: formData})) as {
      data: any;
      error: any
    };
    
    if (!error) {
      onSubmit()
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
                <Card.Title className="mb-0">Add new partner</Card.Title>
              </Card.Header>
              <Card.Body>
                <FairyTaleAlert
                  variant={statusSuccess ? "success" : "danger"}
                  message={statusSuccess ? tcommon("Add") : msgError}
                  heading=""
                  show={showAlert}
                  name="message-create"
                />
                <FairytaleFormComponent 
                  formProps={PARTNER_FORM_ATTRIB_DATA}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  // onHideModal={_handleCloseModal}
                  formSchema={PARTNER_SCHEMA}
                  initialFormValues={initialValues}
                  fileOnChange={handleFileChange}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default AddDetailsView;
