import React from "react";

import { Card } from "react-bootstrap";
import SignIn from "../../components/auth/SignIn";
import logo2 from "../../assets/img/Fairytale_Logo.png";

import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const SignInPage = () => {
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  return (
    <React.Fragment>
      <Helmet title="Sign In" />
      <div className="text-center mt-4">
        <h2>{tpagetexts("appNameMain")}</h2>
        <p className="lead">{tpagetexts("signinSubTitle")}</p>
      </div>
      <Card data-cy="auth-signin">
        <Card.Body>
          <div className="m-sm-4 hello">
            <div className="text-center">
              <img src={logo2} alt="Fairytale" className="img-fluid rounded-circle" width="132" height="132" />
            </div>
            <SignIn />
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default SignInPage;
