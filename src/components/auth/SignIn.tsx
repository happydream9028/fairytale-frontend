import React from "react";

import { Formik } from "formik";
import { Alert, Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
import fairytaleYup from "../../yup";

function SignIn() {
  // @ts-ignore
  const { t: tforms } = useTranslation(["formFields"]);
  const { t: tpagetexts } = useTranslation(["pageTexts"]);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        submit: false,
      }}
      validationSchema={fairytaleYup.object().shape({
        email: fairytaleYup.string().email(tforms("emailMustBeValid")).max(255).required(tforms("emailIsRequired")),
        password: fairytaleYup.string().max(255).required(tforms("passwordIsRequired")),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signIn(values.email, values.password);
          navigate("/private/dashboard/home");
        } catch (error: any) {
          console.log("Error", error);
          const message = error.message || tforms("somethingWentWrong");
          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
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
              data-cy="signin-email"
              placeholder={tforms("enterEmail")}
              value={values.email}
              isInvalid={Boolean(touched.email && errors.email)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{tforms("passwordField")}</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              name="password"
              data-cy="signin-password"
              placeholder={tforms("enterPassword")}
              value={values.password}
              isInvalid={Boolean(touched.password && errors.password)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!touched.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
            <small data-cy="signin-reset-link">
              <Link to="/auth/reset-password">{tpagetexts("forgotPassword")}</Link>
            </small>
            <br />
          </Form.Group>

          <div>
            <Form.Check type="checkbox" id="rememberMe" label={tforms("rememberMe")} defaultChecked />
          </div>

          <div className="text-center mt-3">
            <Button type="submit" data-cy="signin-submit" variant="primary" size="lg" disabled={isSubmitting}>
              {tpagetexts("signin")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignIn;
