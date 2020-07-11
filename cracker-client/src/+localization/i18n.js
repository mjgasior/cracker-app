import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import pl from "./pl.json";

const resources = {
  en,
  pl,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pl",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
