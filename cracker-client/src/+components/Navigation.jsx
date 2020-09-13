import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu } from "antd";
import { ROUTES } from "../+utils/routes";

export const Navigation = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { t } = useTranslation();
  const location = useLocation();

  const handleAuthentication = useCallback(() => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else {
      loginWithRedirect();
    }
  }, [isAuthenticated, logout, loginWithRedirect]);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[location.pathname]}
    >
      <Menu.Item key={ROUTES.HOME}>
        <Link to={ROUTES.HOME}>{t("home")}</Link>
      </Menu.Item>
      <Menu.Item key={ROUTES.MARKERS}>
        <Link to={ROUTES.MARKERS}>{t("markers")}</Link>
      </Menu.Item>
      <Menu.Item key={ROUTES.MARKERS_LIST}>
        <Link to={ROUTES.MARKERS_LIST}>{t("markers_list")}</Link>
      </Menu.Item>
      {isAuthenticated && (
        <Menu.Item key={ROUTES.PROFILE}>
          <Link to={ROUTES.PROFILE}>{t("profile")}</Link>
        </Menu.Item>
      )}
      <Menu.Item key={ROUTES.LOGOUT} onClick={handleAuthentication}>
        {t(isAuthenticated ? "log_out" : "log_in")}
      </Menu.Item>
    </Menu>
  );
};
