import { Campaign, AdCreate } from "../../types/ads";
import { IFormAtributes } from "../../types/feed";

export const FORM_INITIAL_VALUES: Campaign = {
  id: 0,
  app_id: 0,
  description: "",
  title: "",
  is_active: true,
  ad_duration: 0,
};

export const AD_FORM_INITIAL_VALUES: AdCreate = {
  campaign: 0,
  link: "",
};

export const CREATE_FORM_ATTRIB_DATA: Array<IFormAtributes> = [
  {
    type: "text",
    name: "title",
    required: true,
    placeholder: "campaignTitlePlaceholder",
    visible: true,
    label: "campaignTitle",
    translateText: "campaignTitle",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "description",
    required: true,
    placeholder: "campaignDescriptionPlaceholder",
    visible: true,
    label: "campaignDescription",
    translateText: "campaignDescription",
    value: "",
    disabled: false,
  },
  {
    type: "checkbox",
    name: "is_active",
    required: false,
    placeholder: "campaignStatusPlaceholder",
    visible: true,
    label: "campaignStatus",
    translateText: "campaignStatus",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "ad_duration",
    required: true,
    placeholder: "campaignDurationPlaceholder",
    visible: true,
    label: "campaignDuration",
    translateText: "campaignDuration",
    value: "",
    disabled: false,
  },
];

export const CREATE_ADS_FORM_ATTRIB_DATA: Array<IFormAtributes> = [
  {
    type: "text",
    name: "link",
    required: true,
    placeholder: "adLink",
    visible: true,
    label: "adLinkLabel",
    translateText: "adLinkLabel",
    value: "",
    disabled: false,
  },
];
