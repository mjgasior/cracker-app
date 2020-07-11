import React from "react";
import auth from "../+utils/Auth";
import { useTranslation } from "react-i18next";

export const ProfileView = () => {
  const { t } = useTranslation();
  const isAdmin = auth.isUserAdmin();
  const email = auth.getEmail();
  const isEmailVerified = auth.getIsEmailVerified();
  return (
    <div>
      <h2>{t("profile")}</h2>
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
        Your email is {email} and it is {!isEmailVerified && "not "}verified.
        {t("profile")}
      </p>
    </div>
  );
};
