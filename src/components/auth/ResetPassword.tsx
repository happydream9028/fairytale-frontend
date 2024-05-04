import React, { useState } from "react";

import { Formik } from "formik";
import { Alert, Button, Form } from "react-bootstrap";
import FairyTaleAlert from "../fairytale-alert";

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState<"success" | "danger" | "light">("light");
  const navigate = useNavigate();
  const { sendResetPawwordEmail } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email(tforms("emailMustBeValid")).max(255).required(tforms("emailIsRequired")),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const passwordResetResult: any = await sendResetPawwordEmail(values.email);
          if (passwordResetResult.emailSent === true) {
            setShowAlert(true);
            setAlertVariant("success");
            setAlertMessage("Password reset email sent, please check you email for instructions.");
            setInterval(() => {
              setShowAlert(false);
              navigate("/auth/signin");
            }, 5000);
          } else {
            setShowAlert(true);
            setAlertVariant("danger");
            setAlertMessage("Password reset email not sent, please try again soon");
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
            <Form.Label>{tforms("emailField")}</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              name="email"
              data-cy="reset-email"
              placeholder={tforms("enterEmail")}
              value={values.email}
              isInvalid={Boolean(touched.email && errors.email)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
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
  );
}

export default ResetPassword;
