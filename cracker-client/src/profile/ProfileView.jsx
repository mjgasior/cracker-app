import React, { useCallback } from "react";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { PRIMARY_LANGUAGE, SECONDARY_LANGUAGE } from "../+localization/i18n";
import { useUser } from "../+hooks/useUser";

export const ProfileView = () => {
  const { t, i18n } = useTranslation();
  const { email, isAdmin, isEmailVerified } = useUser();

  const handleLanguageChange = useCallback(
    (isChecked) => {
      i18n.changeLanguage(isChecked ? PRIMARY_LANGUAGE : SECONDARY_LANGUAGE);
    },
    [i18n]
  );

  const verificationLabel = isEmailVerified
    ? t("is_verified")
    : t("is_not_verified");

  return (
    <div>
      <h2>{t("profile")}</h2>
      <p>
        <Switch
          defaultChecked={i18n.language === PRIMARY_LANGUAGE}
          checkedChildren={PRIMARY_LANGUAGE}
          unCheckedChildren={SECONDARY_LANGUAGE}
          onChange={handleLanguageChange}
        />
      </p>
      <p>
        {t("current_build")}: <i>{process.env.NODE_ENV}</i>
      </p>
      <p>
        {t("current_api_url")}: {process.env.REACT_APP_API_URL}
      </p>
      <p>{isAdmin ? t("admin_rights") : t("admin_rights_lack")}</p>
      <p>
        {t("profile_data", {
          email,
          verificationLabel,
        })}
      </p>
    </div>
  );
};
