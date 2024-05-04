import { ChangeEventHandler, MouseEventHandler } from "react";
import { FormikErrors, FormikTouched, FormikValues } from "formik";

export interface IAppCreate {
  app_owner_group: number;
  app_title: string;
  app_store_id: string;
  in_app_message: string;
}

interface IAppUserGroup {
  group_id: number;
  group_name: string;
}

export interface IApp {
  app_id: number;
  app_title: string;
  app_store_id: string;
  deleted: boolean;
  user_group: IAppUserGroup;
  push_notification_tag: string;
  in_app_message: string;
}

export interface IAppDetailComponentProps {
  app: IApp;
  onClickBack: MouseEventHandler<SVGElement>;
}

export interface IAppDataEditFormComponentProps {
  formData: IApp;
}

export interface IAppDataEditFormSubCompnentProps {
  idx: string | number;
  labelValue: string;
  nameValue: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  touched: FormikTouched<FormikValues>;
  errors: FormikErrors<FormikValues>;
}
