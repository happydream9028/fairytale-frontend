import { IFormAtributes } from "../../types/feed";
import { ICreateMessage } from "../../types/message";

function formatDate(date: Date) {
  const pad = (num: number) => (num < 10 ? '0' + num : num);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // getMonth() returns 0-11
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}


export const CREATE_FORM_INITIAL_VALUES: ICreateMessage = {
  message_title: "",
  message_body: "",
  link: "",
  message_type: 0,
  yes_button_text: "",
  yes_button_text_en: "",
  no_button_text: "",
  no_button_text_en: "",
  pinned_until: formatDate(new Date()),
  send_push: false,
  icon_url: null,
  header_image_url: null,
  message_pinned: false, 
};

export const CREATE_MESSAGE_FORM_ATTRIB_DATA: Array<IFormAtributes> = [
  {
    type: "text",
    name: "message_title",
    required: true,
    placeholder: "messageTitlePlaceholder",
    visible: true,
    label: "message_title",
    translateText: "message_title",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "message_body",
    required: true,
    placeholder: "messageBodyPlaceholder",
    visible: true,
    label: "message_body",
    translateText: "message_body",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "link",
    required: true,
    placeholder: "messageLinkPlaceholder",
    visible: true,
    label: "link",
    translateText: "link",
    value: "",
    disabled: false,
  },
  {
    type: "select",
    name: "message_type",
    required: true,
    placeholder: "messageTypePlaceholder",
    visible: true,
    label: "message_type",
    translateText: "message_type",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "yes_button_text",
    required: true,
    placeholder: "messageYes_button_textPlaceholder",
    visible: true,
    label: "yes_button_text",
    translateText: "yes_button_text",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "yes_button_text_en",
    required: true,
    placeholder: "messageYes_button_text_enPlaceholder",
    visible: true,
    label: "yes_button_text_en",
    translateText: "yes_button_text_en",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "no_button_text",
    required: true,
    placeholder: "messageNo_button_textPlaceholder",
    visible: true,
    label: "no_button_text",
    translateText: "no_button_text",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "no_button_text_en",
    required: true,
    placeholder: "messageNo_button_text_enPlaceholder",
    visible: true,
    label: "no_button_text_en",
    translateText: "no_button_text_en",
    value: "",
    disabled: false,
  },
  {
    type: "file",
    name: "icon_url",
    required: false,
    placeholder: "messageIcon_urlPlaceholder",
    visible: true,
    label: "icon_url",
    translateText: "icon_url",
    value: "",
    disabled: false,
  },
  {
    type: "file",
    name: "header_image_url",
    required: false,
    placeholder: "messageHeader_image_urlPlaceholder",
    visible: true,
    label: "header_image_url",
    translateText: "header_image_url",
    value: "",
    disabled: false,
  },
  {
    type: "datetime-local",
    name: "pinned_until",
    required: true,
    placeholder: "messagePinned_untilPlaceholder",
    visible: true,
    label: "pinned_until",
    translateText: "pinned_until",
    value: "",
    disabled: false,
  },
  {
    type: "checkbox",
    name: "send_push",
    required: false,
    placeholder: "messageSend_pushPlaceholder",
    visible: true,
    label: "send_push",
    translateText: "send_push",
    value: "",
    disabled: false,
  },
];
