import React from "react";

import { Card } from "react-bootstrap";
import ResetPassword from "../../components/auth/ResetPassword";

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const ResetPasswordPage = () => {
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  return (
    <React.Fragment>
      <Helmet title="Reset Password" />
      <div className="text-center mt-4">
        <h1 className="h2">{tpagetexts("resetPassword")}</h1>
        <p className="lead">{tpagetexts("resetPasswordSubtitle")}</p>
      </div>
      <Card data-cy="auth-reset">
        <Card.Body>
          <div className="m-sm-4">
            <ResetPassword />
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ResetPasswordPage;
