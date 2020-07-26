import { useTranslation } from "react-i18next";
import { getLanguage } from "./../../+localization/i18n";

export const useCurrentLanguage = () => {
  const { i18n } = useTranslation();
  return getLanguage(i18n.language);
};
