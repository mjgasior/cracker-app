import React, { useCallback } from "react";
import auth from "../+utils/Auth";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";

export const ProfileView = () => {
  const { t, i18n } = useTranslation();
  const isAdmin = auth.isUserAdmin();
  const email = auth.getEmail();
  const verificationLabel = auth.getIsEmailVerified()
    ? t("is_verified")
    : t("is_not_verified");

  const handleLanguageChange = useCallback(
    (isChecked) => {
      i18n.changeLanguage(isChecked ? "en" : "pl");
    },
    [i18n]
  );

  return (
    <div>
      <h2>{t("profile")}</h2>
      <p>
        <Switch
          checkedChildren="EN"
          unCheckedChildren="PL"
          onChange={handleLanguageChange}
        />
      </p>
      <p>
        {t("current_build")}: <i>{process.env.NODE_ENV}</i>
      </p>
      <p>
        {t("current_api_url")}: {process.env.REACT_APP_API_URL}
      </p>
      <p>
        {t("current_auth0")}: {process.env.REACT_APP_AUTH0_ORIGIN}
      </p>
      <p>{isAdmin ? t("admin_rights") : t("admin_rights_lack")}</p>
      <p>
        {t("profile_data", {
          email,
          verification: verificationLabel,
        })}
      </p>
    </div>
  );
};
