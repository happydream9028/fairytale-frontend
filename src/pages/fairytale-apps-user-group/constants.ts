import { IFormAtributes } from "../../types/feed";

export const USER_GROUP_CREATE_FORM_ATTRIBUTES: IFormAtributes[] = [
  {
    type: "text",
    name: "name",
    required: true,
    placeholder: "userGroupNamePlaceholder",
    visible: true,
    label: "userGroupName",
    translateText: "userGroupName",
    value: "",
    disabled: false,
  },
  {
    type: "select",
    name: "app",
    required: true,
    placeholder: "userGroupNamePlaceholder",
    visible: true,
    label: "app",
    translateText: "app",
    value: "",
    disabled: false,
  },
];

export const USER_GROUP_FORM_ATTRIB_DATA: Array<IFormAtributes> = [
  {
    type: "text",
    name: "group_name",
    required: true,
    placeholder: "userGroupNamePlaceholder",
    visible: true,
    label: "userGroupName",
    translateText: "userGroupName",
    value: "",
    disabled: false,
  },
  {
    type: "select",
    name: "app",
    required: true,
    placeholder: "userGroupNamePlaceholder",
    visible: true,
    label: "app",
    translateText: "app",
    value: "",
    disabled: false,
  },
];

export interface IUserGroup {
  group_id: number;
  group_name: string;
  app: any;
}