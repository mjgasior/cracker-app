import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import pl from "./pl.json";

export const PRIMARY_LANGUAGE = "en";
export const SECONDARY_LANGUAGE = "pl";

const resources = {
  en,
  pl,
};

i18n.use(initReactI18next).init({
  resources,
  lng: PRIMARY_LANGUAGE,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
