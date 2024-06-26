import { IFormAtributes } from "../../types/feed";
export const WEATHER_CREATE_FORM_ATTRIBUTES: IFormAtributes[] = [
  {
    type: "text",
    name: "place",
    required: true,
    placeholder: "placeNamePlaceholder",
    visible: true,
    label: "placeName",
    translateText: "placeName",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "latitude",
    required: true,
    placeholder: "latitudeNamePlaceholder",
    visible: true,
    label: "latitudeName",
    translateText: "latitudeName",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "longitude",
    required: true,
    placeholder: "longitudeNamePlaceholder",
    visible: true,
    label: "longitudeName",
    translateText: "longitudeName",
    value: "",
    disabled: false,
  },
];


export const WEATHER_FORM_ATTRIB_DATA: Array<IFormAtributes> = [
  {
    type: "text",
    name: "place",
    required: true,
    placeholder: "placeNamePlaceholder",
    visible: true,
    label: "placeName",
    translateText: "placeName",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "latitude",
    required: true,
    placeholder: "latitudeNamePlaceholder",
    visible: true,
    label: "latitudeName",
    translateText: "latitudeName",
    value: "",
    disabled: false,
  },
  {
    type: "text",
    name: "longitude",
    required: true,
    placeholder: "longitudeNamePlaceholder",
    visible: true,
    label: "longitudeName",
    translateText: "longitudeName",
    value: "",
    disabled: false,
  },
];