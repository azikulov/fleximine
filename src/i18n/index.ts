import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./enTranslations.json";
import ruTranslation from "./ruTranslations.json";

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: ruTranslation,
    },

    en: {
      translation: enTranslation,
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

export default i18n;
