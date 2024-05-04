import React, { ChangeEventHandler } from "react";

import { Formik, FormikErrors, FormikHelpers, FormikTouched, FormikValues } from "formik";
import { Form } from "react-bootstrap";
import FairytaleDefaultFormComponent from "./DefaultForm";
import FairyTaleButton from "../fairytale-button";

import { useTranslation } from "react-i18next";
import { IFormAtributes } from "../../types/feed";

export interface IBasicFormComponentprops {
  formSchema: any;
  onSubmit: any;
  initialFormValues: any;
  editMode: boolean;
  formProps: IFormAtributes[];
  selectValues?: object;
  fileOnChange?: any;
  onChange?: (e: React.ChangeEvent<any>) => void;
}

export interface IBasicFormChildComponentprops {
  formProps: IFormAtributes[];
  onChange?: ChangeEventHandler<any>;
  touched: FormikTouched<FormikValues>;
  errors: FormikErrors<FormikValues>;
  values: any;
  selectValues?: any;
  fileOnChange?: any;
}

const FairytaleFormComponent: React.FC<IBasicFormComponentprops> = ({
  formSchema,
  onSubmit,
  initialFormValues,
  editMode,
  formProps,
  selectValues,
  fileOnChange,
  onChange,
}): any => {
  const { t: tcommon } = useTranslation(["common"]);

  return (
    <Formik validationSchema={formSchema} onSubmit={onSubmit} initialValues={initialFormValues}>
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        isValidating,
        errors,
        isSubmitting,
        setFieldValue,
        setValues,
      }) => {
        const _handleChangeWrapper = (e: React.ChangeEvent) => {
          //handle change outside
          onChange && onChange(e);
          //handle formik state
          handleChange(e);
        };
        return (
          <Form onSubmit={handleSubmit} data-cy="app-form">
            <FairytaleDefaultFormComponent
              formProps={formProps}
              onChange={_handleChangeWrapper}
              touched={touched}
              errors={errors}
              values={values}
              selectValues={selectValues}
              fileOnChange={fileOnChange}
            />
            <div className="mb-3 mt-5">
              <FairyTaleButton
                name="app-create"
                disabled={isSubmitting}
                butttonLabel={tcommon("submit")}
                type="submit"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default FairytaleFormComponent;
