import { IFormAtributes } from "../../types/feed";
import { ICreateUser } from "../../types/user";

export const CREATE_FORM_INITIAL_VALUES: ICreateUser = {
  user_id: 0,
  email: "",
  password: "",
  is_active: true,
  first_name: "",
  last_name: "",
  phone: "",
  role: 0,
  user_group: 1,
  enable_app_settings: false,
  enable_feed_creation: false,
  enable_integrations: false,
};

export const CREATE_USER_FORM_ATTRIB_DATA: Array<IFormAtributes> = [
  {
    type: "text",
    name: "first_name",
    required: true,
    placeholder: "firstNamePlaceholder",
    visible: true,
    label: "firstName",
    translateText: "firstName",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "last_name",
    required: true,
    placeholder: "lastNamePlaceholder",
    visible: true,
    label: "lastName",
    translateText: "lastName",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "email",
    required: true,
    placeholder: "emailPlaceholder",
    visible: true,
    label: "email",
    translateText: "email",
    value: "",
    disabled: false,
  },
  {
    type: "password",
    name: "password",
    required: true,
    placeholder: "passwordPlaceholder",
    visible: true,
    label: "password",
    translateText: "password",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "phone",
    required: true,
    placeholder: "phoneNumberPlaceholder",
    visible: true,
    label: "phoneNumber",
    translateText: "phoneNumber",
    value: "",
    disabled: false,
  },
  {
    type: "select",
    name: "role",
    required: true,
    placeholder: "",
    visible: true,
    label: "userRole",
    translateText: "userRole",
    value: "",
    disabled: false,
  },
  {
    type: "select",
    name: "user_group",
    required: true,
    placeholder: "",
    visible: true,
    label: "userGroup",
    translateText: "userGroup",
    value: "",
    disabled: false,
  },
  {
    type: "checkbox",
    name: "is_active",
    required: false,
    placeholder: "",
    visible: true,
    label: "is_active",
    translateText: "is_active",
    value: "",
    disabled: false,
  },
  {
    type: "checkbox",
    name: "enable_app_settings",
    required: false,
    placeholder: "",
    visible: false,
    label: "enable_app_settings",
    translateText: "enable_app_settings",
    value: "",
    disabled: false,
  },
  {
    type: "checkbox",
    name: "enable_feed_creation",
    required: false,
    placeholder: "",
    visible: false,
    label: "enable_feed_creation",
    translateText: "enable_feed_creation",
    value: "",
    disabled: false,
  },
  {
    type: "checkbox",
    name: "enable_integrations",
    required: false,
    placeholder: "",
    visible: false,
    label: "enable_integrations",
    translateText: "enable_integrations",
    value: "",
    disabled: false,
  },
];