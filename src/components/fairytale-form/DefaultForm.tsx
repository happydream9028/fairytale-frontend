import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { getIn } from "formik";
import { useTranslation } from "react-i18next";
import { IBasicFormChildComponentprops } from "./index";

const FairytaleDefaultFormComponent: React.FC<IBasicFormChildComponentprops> = ({
  formProps,
  onChange,
  touched,
  errors,
  values,
  selectValues,
  fileOnChange,
}) => {
  const { t: tforms } = useTranslation(["formFields"]);
  return (
    <>
      <Row xs={1} md={1} lg={2} xl={2} xxl={2}>
        {formProps.map((formProp, idx) => {
          const { name, required, placeholder, label, disabled, value, translateText, type, visible, description } =
            formProp;
          if (visible) {
            switch (type) {
              case "select":
                return (
                  <Form.Group as={Col} controlId={`${name}-${idx}`} key={idx}>
                    <Form.Label>{tforms(label)}</Form.Label>
                    <Form.Select
                      data-cy={`app-default-select-input-${name}`}
                      aria-label={name}
                      name={name}
                      size="lg"
                      required={required}
                      disabled={disabled}
                      onChange={onChange}
                      value={`${getIn(values, name)}`}
                    >
                      {selectValues[name].map(
                        (
                          option: {
                            label: string;
                            value: string;
                          },
                          idx: number
                        ) => (
                          <option key={idx} value={Number(option.value)}>
                            {option.label}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </Form.Group>
                );
              case "checkbox":
                return (
                  <Form.Group as={Col} controlId={`${name}-${idx}`} key={idx} className="my-3">
                    <Form.Check
                      data-cy={`app-default-select-input-${name}`}
                      aria-label={name}
                      label={tforms(label)}
                      type={type}
                      name={name}
                      checked={getIn(values, name)}
                      value={`${getIn(values, name)}`}
                      required={required}
                      disabled={disabled}
                      onChange={onChange}
                    />
                    {!!getIn(touched, name) && (
                      <Form.Control.Feedback type="invalid">{getIn(errors, name)}</Form.Control.Feedback>
                    )}
                  </Form.Group>
                );
              case "file":
                return (
                  <Form.Group as={Col} controlId={`${name}-${idx}`} key={idx}>
                    <Form.Label>{tforms(label)}</Form.Label>
                    <Form.Control
                      data-cy={`app-default-file-input-${name}`}
                      aria-label={name}
                      type={type}
                      name={name}
                      accept="image/*"
                      required={required}
                      disabled={disabled}
                      onChange={fileOnChange}
                    />
                    {description ? (
                      <Form.Text id={`${name}-${idx}-info`} muted>
                        {tforms(description)}
                      </Form.Text>
                    ) : (
                      <></>
                    )}
                    {!!getIn(touched, name) && (
                      <Form.Control.Feedback type="invalid">{getIn(errors, name)}</Form.Control.Feedback>
                    )}
                  </Form.Group>
                );
              default:
                return (
                  <Form.Group as={Col} controlId={`${name}-${idx}`} key={idx} className="mb-2">
                    <Form.Label>{tforms(label)}</Form.Label>
                    <Form.Control
                      type={type}
                      size="lg"
                      aria-label={name}
                      data-cy={`app-default-input-${name}`}
                      name={name}
                      required={required}
                      placeholder={tforms(placeholder)}
                      isInvalid={Boolean(getIn(touched, name) && getIn(errors, name))}
                      disabled={disabled}
                      value={`${getIn(values, name)}`}
                      onChange={onChange}
                    />
                    {!!getIn(touched, name) && (
                      <Form.Control.Feedback type="invalid">{getIn(errors, name)}</Form.Control.Feedback>
                    )}
                  </Form.Group>
                );
            }
          }
        })}
      </Row>
    </>
  );
};

export default FairytaleDefaultFormComponent;
