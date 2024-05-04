import React, { useState } from "react";

import { Alert, Button, Card, Form } from "react-bootstrap";
import FairyTaleAlert from "../fairytale-alert";
import { Formik } from "formik";

import { useNavigate, useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useResetPasswordMutation } from "../../redux/appQuery";
import { Helmet } from "react-helmet-async";

function ResetPasswordWithToken() {
  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<"success" | "danger" | "light">("light");
  const navigate = useNavigate();
  const { search } = useLocation();
  const { token } = useParams();
  const [resetPassword] = useResetPasswordMutation();

  return (
    <>
      <Helmet title="Reset Password" />
      <div className="text-center mt-4">
        <h1 className="h2">{tpagetexts("resetPassword")}</h1>
        <p className="lead">{tforms("enterNewPassword")}</p>
      </div>
      <Card data-cy="auth-reset">
        <Card.Body>
          <div className="m-sm-4">
            <Formik
              initialValues={{
                password: "",
                repeatpassword: "",
                submit: false,
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .min(8, tforms("passwordMinReq"))
                  .max(50, tforms("passwordMaxReq"))
                  .required(tforms("fieldIsRequired")),
                repeatpassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], tforms("passwoordNotmatch"))
                  .min(8, tforms("passwordMinReq"))
                  .max(50, tforms("passwordMaxReq"))
                  .required(tforms("fieldIsRequired")),
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  const passwordResetResult: any = await resetPassword({
                    email: search.replace("?email=", ""),
                    password: values.password,
                    token: token as string,
                  });
                  if (passwordResetResult.emailSent === true) {
                    setShowAlert(true);
                    setAlertVariant("success");
                    setAlertMessage(tforms("passwordResetEmailSent"));
                    setInterval(() => {
                      setShowAlert(false);
                      navigate("/auth/signin");
                    }, 5000);
                  } else {
                    setShowAlert(true);
                    setAlertVariant("danger");
                    setAlertMessage(tforms("passwordResetEmailNotSent"));
                    setInterval(() => {
                      setShowAlert(false);
                    }, 5000);
                  }
                } catch (error: any) {
                  const message = error.message || tforms("somethingWentWrong");
                  setStatus({ success: false });
                  setErrors({ submit: message });
                  setSubmitting(false);
                  setShowAlert(true);
                  setAlertVariant("danger");
                  setAlertMessage(message);
                  setInterval(() => {
                    setShowAlert(false);
                  }, 5000);
                }
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <Form onSubmit={handleSubmit}>
                  {errors.submit && (
                    <Alert className="my-3" variant="danger">
                      <div className="alert-message">{errors.submit}</div>
                    </Alert>
                  )}
                  <Form.Group className="mb-3">
                    <Form.Label>{tforms("password")}</Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      name="password"
                      data-cy="reset-password"
                      placeholder={tforms("enterNewPassword")}
                      value={values.password}
                      isInvalid={Boolean(touched.password && errors.password)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {!!touched.password && (
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{tforms("repeatpassword")}</Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      name="repeatpassword"
                      data-cy="reset-password-repeatpassword"
                      placeholder={tforms("enterRepeatPassword")}
                      value={values.repeatpassword}
                      isInvalid={Boolean(touched.repeatpassword && errors.repeatpassword)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {!!touched.repeatpassword && (
                      <Form.Control.Feedback type="invalid">{errors.repeatpassword}</Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <div className="text-center mt-3">
                    <Button type="submit" data-cy="reset-submit" variant="primary" size="lg" disabled={isSubmitting}>
                      {tpagetexts("resetPassword", { ns: "pageTexts" })}
                    </Button>
                  </div>
                  <FairyTaleAlert
                    variant={alertVariant}
                    message={alertMessage}
                    heading=""
                    show={showAlert}
                    name="user-create"
                  />
                </Form>
              )}
            </Formik>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ResetPasswordWithToken;
