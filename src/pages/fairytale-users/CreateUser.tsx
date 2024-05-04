import React, { useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FairyTaleAlert from "../../components/fairytale-alert";
import { CREATE_USER_FORM_ATTRIB_DATA, CREATE_FORM_INITIAL_VALUES } from "./constants";
import FairytaleFormComponent from "../../components/fairytale-form";
import { ICreateUser, IUserRole } from "../../types/user";
import fairytaleYup from "../../yup";

import { useCreateNewUserMutation, useGetUserGroupsQuery, useGetUserRolesQuery } from "../../redux/appQuery";
import { useNavigate } from "react-router-dom";
import { IUserGroup } from "../fairytale-apps-user-group/constants";

const CreateUser = () => {
  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tcommon } = useTranslation(["common"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const [createNewUser] = useCreateNewUserMutation();
  const { data: userRoles } = useGetUserRolesQuery({});
  const { data: userGroups } = useGetUserGroupsQuery({});

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  
  const USER_CREATE_SCHEMA = fairytaleYup.object().shape({
    email: fairytaleYup.string().max(255).required("Field can not be empty"),
    password: fairytaleYup.string().max(255).required("Field can not be empty"),
    first_name: fairytaleYup.string().max(255).required("Field can not be empty"),
    last_name: fairytaleYup.string().max(255).required("Field can not be empty"),
    phone: fairytaleYup.string().max(12).required("Field can not be empty"),
    role: fairytaleYup.string().required("Field can not be empty"),
  });

  const getUserRoleOptions = () => {
    const roleOptions = userRoles
      ? userRoles.map((role: IUserRole) => {
          return { value: role.id, label: role.role_name };
        })
      : [];
 
    return roleOptions;
  };

  const getUserGroupOptions = () => {
    const groupOptions = userGroups
      ? userGroups.map((group: IUserGroup) => {
          return { value: group.group_id, label: group.group_name };
        })
      : [];

    groupOptions.push({ value: -1, label: "None" });
    return groupOptions;
  };

  const _handleSubmit = async (values: ICreateUser, { setStatus, setErrors, setSubmitting, resetForm }: any) => {
    values.role = Number(values.role);
    const result = (await createNewUser(values)) as { data: any };
    if (result.data) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 10000);
      resetForm();
      navigate("/private/users/list");
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
        <h1 className="h3 mb-3">{tpagetexts("createNewUserMainTitle")}</h1>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <FairytaleFormComponent
                  formProps={CREATE_USER_FORM_ATTRIB_DATA}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  formSchema={USER_CREATE_SCHEMA}
                  initialFormValues={CREATE_FORM_INITIAL_VALUES} 
                  selectValues={{ role: getUserRoleOptions(), user_group: getUserGroupOptions() }}

                />
                <FairyTaleAlert
                  variant="success"
                  message={tcommon("appCreated")}
                  heading=""
                  show={showAlert}
                  name="user-create"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default CreateUser;
