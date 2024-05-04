import React, { useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FairytaleFormComponent from "../../components/fairytale-form";
import fairytaleYup from "../../yup";
import {  useGetAppsQuery, useUpdateUserGroupMutation } from "../../redux/appQuery";
import FairyTaleAlert from "../../components/fairytale-alert"; 
 
import { IUserGroup, USER_GROUP_FORM_ATTRIB_DATA } from "./constants";
import { t } from "i18next";
import { IApp } from "../../types/app";

interface IUserGroupDetailProps { 
  userGroup: IUserGroup; 
}

const UserGroupDetailsView: React.FC<IUserGroupDetailProps> = ({ userGroup }) => {
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tforms } = useTranslation(["formFields"]);
  const [updateUserGroup] = useUpdateUserGroupMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(true) 
  const [msgError, setMsgError] = useState('error')
  const { data: apps } = useGetAppsQuery({})

  const USER_GROUPS_SCHEMA = fairytaleYup.object().shape({
    edit_group_name: fairytaleYup.string(),
    edit_app: fairytaleYup.string() 
  });

  const USER_GROUPS_EDIT_FORM_ATTRIB_DATA = USER_GROUP_FORM_ATTRIB_DATA.map((field) => {
    return { ...field, name: `edit_${field.name}` };
  });
 
  const initialValues = {
    id: userGroup.group_id,
    edit_group_name: userGroup.group_name, 
    edit_app: userGroup.app?.app_id
  };

  const getAppUserGroupOptions = () => {
    const options = apps
    ? apps.map((type: IApp) => {
        return { value: type.app_id, label: type.app_title };
      })
    : [];
 
    return options;
  };

  const _handleSubmit = async (values: any, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
    const editData = { 
      group_name: values.edit_group_name, 
      app: values.edit_app
    };

    const { data, error } = (await updateUserGroup({id: values.id, body: editData})) as {
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
                <Card.Title className="mb-0">{tpagetexts("userGroupDetailHeader")}</Card.Title>
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
                  formProps={USER_GROUPS_EDIT_FORM_ATTRIB_DATA}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  formSchema={USER_GROUPS_SCHEMA}
                  initialFormValues={initialValues}
                  selectValues={{ edit_app: getAppUserGroupOptions() }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default UserGroupDetailsView;
