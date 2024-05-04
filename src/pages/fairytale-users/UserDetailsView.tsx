import React, { useState } from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ICreateUser, IUserGroup, IUserRole } from "../../types/user";
import FairytaleFormComponent from "../../components/fairytale-form";
import { CREATE_USER_FORM_ATTRIB_DATA } from "./constants";
import fairytaleYup from "../../yup";
import { useEditUserMutation, useGetUserGroupsQuery, useGetUserRolesQuery } from "../../redux/appQuery";
import FairyTaleAlert from "../../components/fairytale-alert";

interface IUserDetailProps {
  user: ICreateUser;
}

const UserDetailsView: React.FC<IUserDetailProps> = ({ user }) => {
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const { t: tcommon } = useTranslation(["common"]);
  const [editUser] = useEditUserMutation();
  const [showAlert, setShowAlert] = useState(false);
  const { data: userRoles } = useGetUserRolesQuery({});
  const { data: userGroups } = useGetUserGroupsQuery({});

  const USER_CREATE_SCHEMA = fairytaleYup.object().shape({
    email: fairytaleYup.string().max(255).required("Field can not be empty"),
    first_name: fairytaleYup.string().max(255).required("Field can not be empty"),
    last_name: fairytaleYup.string().max(255).required("Field can not be empty"),
    phone: fairytaleYup.string().max(255).required("Field can not be empty"),
    enable_integrations: fairytaleYup.boolean().required("Field can not be empty"),
    enable_app_settings: fairytaleYup.boolean().required("Field can not be empty"),
    enable_feed_creation: fairytaleYup.boolean().required("Field can not be empty"),
    is_active: fairytaleYup.boolean().required("Field can not be empty"),
    // TODO: role and group
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
    values.user_group = Number(values.user_group);
    const result = (await editUser({ user: values, user_id: user.user_id })) as {
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
                <Card.Title className="mb-0">{tpagetexts("messageDetailHeader")}</Card.Title>
              </Card.Header>
              <Card.Body>
                <FairyTaleAlert
                  variant="success"
                  message={tcommon("userUpdated")}
                  heading=""
                  show={showAlert}
                  name="user-edit"
                />
                <FairytaleFormComponent
                  formProps={CREATE_USER_FORM_ATTRIB_DATA}
                  editMode={false}
                  onSubmit={_handleSubmit}
                  formSchema={USER_CREATE_SCHEMA}
                  initialFormValues={user}
                  selectValues={{ role: getUserRoleOptions(), user_group: getUserGroupOptions() }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default UserDetailsView;
function tforms(arg0: string): string {
  throw new Error("Function not implemented.");
}
