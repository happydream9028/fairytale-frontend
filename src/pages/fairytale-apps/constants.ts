import { IAppCreate } from "../../types/app";
import { IFormAtributes } from "../../types/feed";

export const FORM_INITIAL_VALUES: IAppCreate = {
  app_store_id: "",
  app_title: "",
  app_owner_group: 0,
  in_app_message: "",
};

export const FORM_ATTRIB_DATA: Array<IFormAtributes> = [
  {
    type: "text",
    name: "app_title",
    required: true,
    placeholder: "exampleOwnerName",
    visible: true,
    label: "app_title",
    translateText: "app_title",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "app_store_id",
    required: true,
    placeholder: "exampleAppName",
    visible: true,
    label: "app_store_id",
    translateText: "app_store_id",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "in_app_message",
    required: true,
    placeholder: "exampleInAppMessageIcon",
    visible: true,
    label: "in_app_message",
    translateText: "in_app_message",
    value: "",
    disabled: false,
  },
];
