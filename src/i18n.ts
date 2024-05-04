import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en";
import fi from "./translations/fi";
import se from "./translations/se";
import formfields_fi from "./translations/formfields_fi";
import formfields_se from "./translations/formfields_se";
import formfields_en from "./translations/formfields_en";
import common_en from "./translations/common_en";
import common_fi from "./translations/common_fi";
import common_se from "./translations/common_se";

const resources = {
  fi: {
    formFields: formfields_fi,
    pageTexts: fi,
    common: common_fi,
  },
  se: {
    formFields: formfields_se,
    pageTexts: se,
    common: common_se,
  },
  en: {
    formFields: formfields_en,
    pageTexts: en,
    common: common_en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fi",
  debug: false,
  fallbackLng: "en",
  ns: ["pageTexts", "formFields", "common"],
  interpolation: {
    escapeValue: false,
  },
});
