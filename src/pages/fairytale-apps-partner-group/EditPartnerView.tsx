import React, { MouseEventHandler, useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FairytaleFormComponent from "../../components/fairytale-form";
import fairytaleYup from "../../yup";
import { useUpdatePartnersMutation } from "../../redux/appQuery";
import FairyTaleAlert from "../../components/fairytale-alert"; 

import { t } from "i18next";
import { PARTNER_FORM_ATTRIB_DATA } from "./constants";
import { ArrowLeftCircle } from "react-feather";
import ImagePreview from "../fairytale-messaging/ImagePreview";

interface IEditPartnerProps {
  partner: any; 
  groupId: string;
  onClickBack: MouseEventHandler<SVGElement>; 
}

const EditDetailsView: React.FC<IEditPartnerProps> = ({ partner, groupId, onClickBack }) => {
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tforms } = useTranslation(["formFields"]); 
  const [showAlert, setShowAlert] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(true) 
  const [msgError, setMsgError] = useState('error')
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [updatePartner] = useUpdatePartnersMutation()
  const [alertVariant, setAlertVariant] = useState<"light" | "success" | "danger">("light");
  const [imageUrl, setImageUrl] = useState<string>(partner.image_url || '');

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
  
    const { data, error } = (await updatePartner({ id: partner.id, body: formData})) as {
      data: any;
      error: any
    };
    
    if (!error) { 
      setAlertVariant("success");
      // setAlertMessage(tforms("weatherCreateSuccess"));
      setStatusSuccess(true)
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      console.log({data});
      
      if (data.image_url) {
        setImageUrl(data.image_url); // Assume your API returns the new image URL
      }
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
      <ArrowLeftCircle className="cursor-pointer mb-3" onClick={onClickBack} />
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title className="mb-0">Details partner</Card.Title>
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
                  formProps={PARTNER_FORM_ATTRIB_DATA}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  formSchema={PARTNER_SCHEMA}
                  initialFormValues={partner}  
                  fileOnChange={handleFileChange}
                /> 
                <ImagePreview imageUrl={imageUrl || ''}  placeholderText='' maxWidth={'30%'} />
              </Card.Body>
            </Card>
          </Col>
        </Row> 
      </Container>
    </React.Fragment>
  );
};

export default EditDetailsView;
