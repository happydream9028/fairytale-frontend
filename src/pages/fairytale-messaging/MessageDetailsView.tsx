import React, { useMemo, useState } from "react";

import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";  
import { useTranslation } from "react-i18next";
import { ICreateMessage, IMessage } from "../../types/message";
import FairytaleFormComponent from "../../components/fairytale-form";
import { CREATE_MESSAGE_FORM_ATTRIB_DATA } from "./constants";
import fairytaleYup from "../../yup";
import { useUpdateMessageMutation } from "../../redux/appQuery";
import FairyTaleAlert from "../../components/fairytale-alert";
import ImagePreview from "./ImagePreview";

interface IMessageDetailProps {
  message: IMessage;
  appId: number;
}

const MessageDetailsView: React.FC<IMessageDetailProps> = ({ message, appId }) => {
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { t: tcommon } = useTranslation(["common"]);
  const [updateMessage] = useUpdateMessageMutation();
  const [messageType, setMessageType] = useState<string>(message.message_type.toString());

  const [showAlert, setShowAlert] = useState(false);
  const [pinnedUntil, setPinnedUntil] = useState( message.pinned_until ? new Date(message.pinned_until): '');
  const [messagePinned, setMessagePinned] = useState<boolean>(message.message_pinned);
  const [selectedFileHeader, setSelectedFileHeader] = useState<File | null>(null);
  const [selectedFileIcon,  setSelectedFileIcon] = useState<File | null>(null);
  const [previewIcon,  setPriviewIcon] = useState<string>(message.icon_url);
  const [previewHeader,  setPriviewHeader] = useState<string>(message.header_image_url);

  const getMessageCreateSchema = (messageType: string) => fairytaleYup.object().shape({
    message_title: fairytaleYup.string().max(255).required("Field cannot be empty"),
    message_body: fairytaleYup.string().max(255).required("Field cannot be empty"),
    link: fairytaleYup.string().max(255).required("Field cannot be empty"),
    message_type: fairytaleYup.number().required("Field cannot be empty"),
    yes_button_text: messageType !== "0" ? fairytaleYup.string().max(255).required("Field cannot be empty") 
                          : fairytaleYup.string().max(255),
    yes_button_text_en: messageType !== "0" ? fairytaleYup.string().max(255).required("Field cannot be empty") 
                          : fairytaleYup.string().max(255),
    no_button_text: messageType !== "0" ? fairytaleYup.string().max(255).required("Field cannot be empty") 
                          : fairytaleYup.string().max(255),
    no_button_text_en: messageType !== "0" ? fairytaleYup.string().max(255).required("Field cannot be empty") 
                          : fairytaleYup.string().max(255),
    pinned_until: messagePinned ? fairytaleYup.string().required("Field cannot be empty") : fairytaleYup.string(),
    send_push: fairytaleYup.boolean(),
    message_pinned: fairytaleYup.boolean(),
  });


  const MESSAGE_CREATE_SCHEMA = getMessageCreateSchema(messageType);

  const getMessageTypeOptions = () => {
    return [
      { value: 0, label: "Normal" },
      { value: 1, label: "Pop-up" },
    ];
  };

  const createFormProps = useMemo(() => {
    let formData = [
      ...CREATE_MESSAGE_FORM_ATTRIB_DATA,
    ];

    formData = CREATE_MESSAGE_FORM_ATTRIB_DATA.map(field => {
      // For the pinned_until field, visibility and requirement are conditional
      if (field.name === 'pinned_until') {
        return { ...field, required: messagePinned, visible: messageType === '0' };
      }
      // For specified fields, adjust visibility and requirement when messageType is "0"
      if (["yes_button_text", "yes_button_text_en", "no_button_text", "no_button_text_en", "header_image_url"]
      .includes(field.name) && messageType === "0") {
        return { ...field, visible: false, required: false };
      }
    
      return {
        ...field,
        
      };
    });

    if (messageType === "0") {
      // Add message_pinned when messageType is "0"
      formData.push({
        type: "checkbox",
        name: "message_pinned",
        required: false,
        placeholder: "messagePinnedPlaceholder",
        visible: true,
        label: "message_pinned",
        translateText: "message_pinned",
        value: "",
        disabled: false,
      }); 
    }
  
    return formData;
  }, [messageType, messagePinned, pinnedUntil]);

  const _handleSubmit = async (values: ICreateMessage, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
    values.message_type = Number(values.message_type);

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key as keyof ICreateMessage === 'icon_url' || key === 'header_image_url') {
        return;
      }
    
      if (key === 'message_type') {
        // Ensure message_type is a number.
        formData.append(key, String(Number(value)));
      } else if (key === 'send_push' || key === 'message_pinned') {
        // Ensure send_push and message_pinned are booleans.
        // Convert boolean to string representation.
        formData.append(key, JSON.stringify(Boolean(value)));
      } else if (value instanceof Date) {
        // Convert Date to ISO string format.
        formData.append(key, value.toISOString());
      } else if (value !== null && value !== undefined) {
        // Convert other values to string representation.
        formData.append(key, String(value));
      }
    });
   
    if (selectedFileHeader) {
      formData.append('header_image_url', selectedFileHeader);
    } 
    
    if (selectedFileIcon) {
      formData.append('icon_url', selectedFileIcon);
    } 

    const result = (await updateMessage({ appId: appId, messageId: message.message_id, message: formData })) as {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target;
    const fieldName = field.name as keyof ICreateMessage;
 
    if (fieldName === "message_type") {
      setMessageType(field.value);
    }

    if (fieldName === 'message_pinned') {
      setMessagePinned(field.checked);
    }

    if (fieldName === 'pinned_until') {
      setPinnedUntil( new Date(field.value));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;

    if(name === 'icon_url') {
      setSelectedFileIcon(file);
    }
  
    if(name === 'header_image_url') {
      setSelectedFileHeader(file);
    }
  };
  
  const messageBody = {
    ...message,
    pinned_until:  message.pinned_until ? new Date(message.pinned_until).toISOString().slice(0, 16) : ''
  } 
  if (messageType === "0") {
    messageBody.yes_button_text = ""
    messageBody.yes_button_text_en = "";
    messageBody.no_button_text = "";
    messageBody.no_button_text_en = "";
    messageBody.header_image_url = ""
  }

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title className="mb-0">{tpagetexts("messageDetailHeader")}</Card.Title>
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
                  formProps={createFormProps}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  onChange={handleChange}
                  formSchema={MESSAGE_CREATE_SCHEMA}
                  initialFormValues={messageBody}
                  selectValues={{ message_type: getMessageTypeOptions() }}
                  fileOnChange={handleFileChange}
                />
                 <ImagePreview imageUrl={previewIcon || ''}  placeholderText='Icon preview' />
                 <ImagePreview imageUrl={previewHeader || ''} placeholderText='Header image preview' />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default MessageDetailsView;
