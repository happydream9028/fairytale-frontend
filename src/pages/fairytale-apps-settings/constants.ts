import { IFormAtributes } from "../../types/feed";
export const SETTINGS_CREATE_FORM_ATTRIBUTES: IFormAtributes[] = [
  {
    type: "text",
    name: "key",
    required: true,
    placeholder: "settingNamePlaceholder",
    visible: true,
    label: "settingName",
    translateText: "settingName",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "value",
    required: true,
    placeholder: "settingValuePlaceholder",
    visible: true,
    label: "settingValue",
    translateText: "settingValue",
    value: "",
    disabled: false,
  },
];
