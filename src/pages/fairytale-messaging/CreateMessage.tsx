import React, { ChangeEvent, useMemo, useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FairyTaleAlert from "../../components/fairytale-alert";
import { CREATE_MESSAGE_FORM_ATTRIB_DATA, CREATE_FORM_INITIAL_VALUES } from "./constants";
import FairytaleFormComponent from "../../components/fairytale-form";
import { ICreateMessage } from "../../types/message";
import fairytaleYup from "../../yup";
import SelectFilter from "../../components/fairytale-table/SelectFilter";

import { useCreateNewMessageMutation, useGetAppsQuery } from "../../redux/appQuery";
import { useNavigate } from "react-router-dom";
import { IApp } from "../../types/app";

interface ICreateMessages {
  isUser?: boolean;
  app?: IApp;
}

const CreateMessage: React.FC<ICreateMessages> = ({ isUser = false, app }) => {
  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const [createNewMessage] = useCreateNewMessageMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [messageType, setMessageType] = useState<string>(CREATE_FORM_INITIAL_VALUES.message_type.toString());
  const navigate = useNavigate();
  const { data: apps, isLoading: isAppsLoading, error: appsError } = useGetAppsQuery({});
  const [isUserApp, setIsUserApp] = useState<boolean>(isUser || false);
  const appId = isUser ? app?.app_id : apps && apps.length > 0 ? apps[0].app_id : 0
  const [selectedApp, setSelectedApp] = useState<number>(appId);
  const [pinnedUntil, setPinnedUntil] = useState<string | null>(null);
  const [messagePinned, setMessagePinned] = useState<boolean>(false); 
  const [selectedFileHeader, setSelectedFileHeader] = useState<File | null>(null);
  const [selectedFileIcon, setSelectedFileIcon] = useState<File | null>(null);

  const appSelectData = apps?.map((app: IApp) => {
    return { value: app.app_id, label: app.app_title };
  });

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
    
      return field;
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
    message_pinned: fairytaleYup.boolean().notRequired(),
  });

  const MESSAGE_CREATE_SCHEMA = getMessageCreateSchema(messageType);

  const getMessageTypeOptions = () => {
    return [
      { value: 0, label: "Normal" },
      { value: 1, label: "Pop-up" },
    ];
  };

  const _handleSubmit = async (values: ICreateMessage, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
    values.message_type = Number(values.message_type);
    values.pinned_until = pinnedUntil;
 
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
  
    const result = (await createNewMessage({ 
      appId: selectedApp, 
      message: formData, 
    })) as { data: any };
    if (result.data) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 10000);
      resetForm();
      if(isUserApp) {
        navigate("/private/dashboard/home");  
      } else {
        navigate("/private/messaging/view");
      }
    } else {
      // @ts-ignore
      const message = result.error || t("somethingWentWrong");
      setStatus({ success: false });
      setErrors({ submit: message });
      setSubmitting(false);
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
 
    if (name === "message_type") {
      setMessageType(value);
    }

    if (name === 'message_pinned') {
      setMessagePinned(checked);
    }

    if (name === 'pinned_until') { 
      if(value) {
        setPinnedUntil(value);
      } else {
        setPinnedUntil(null);
      };
    }
  };

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{tpagetexts("createNewMessageMainTitle")}</h1>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="w-50 pt-0 pb-3 mx-auto">
                  { !isUser && <SelectFilter
                    onChangeSelect={(event: ChangeEvent<HTMLSelectElement>) => {
                      setSelectedApp(Number(event.target.value));
                    }}
                    options={isAppsLoading ? [] : appSelectData}
                  />}
                </div>
                <FairytaleFormComponent
                  formProps={createFormProps}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  onChange={handleChange}
                  formSchema={MESSAGE_CREATE_SCHEMA}
                  initialFormValues={CREATE_FORM_INITIAL_VALUES}
                  selectValues={{ message_type: getMessageTypeOptions() }}
                  fileOnChange={handleFileChange}
                />
                <FairyTaleAlert
                  variant="success"
                  message={tcommon("appCreated")}
                  heading=""
                  show={showAlert}
                  name="message-create"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default CreateMessage;
