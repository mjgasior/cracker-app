import React, { useCallback } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import auth from "../+utils/Auth";
import { Menu } from "antd";
import { ROUTES } from "../+utils/routes";

export const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const logout = useCallback(() => {
    auth.logout();
    history.replace(ROUTES.HOME);
  }, [history]);

  const isAuthenticated = auth.isAuthenticated();

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
      {isAuthenticated && (
        <Menu.Item key={ROUTES.PROFILE}>
          <Link to={ROUTES.PROFILE}>{t("profile")}</Link>
        </Menu.Item>
      )}
      <Menu.Item
        key={ROUTES.LOGOUT}
        onClick={() => {
          if (isAuthenticated) {
            logout();
          } else {
            auth.login();
          }
        }}
      >
        {t(isAuthenticated ? "log_out" : "log_in")}
      </Menu.Item>
    </Menu>
  );
};
