import React, { useCallback } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import auth from "../+utils/Auth";
import { Menu } from "antd";
import { ROUTES } from "../+utils/routes";

export const Navigation = () => {
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
        <Link to={ROUTES.HOME}>Home</Link>
      </Menu.Item>
      <Menu.Item key={ROUTES.MARKERS}>
        <Link to={ROUTES.MARKERS}>Markers</Link>
      </Menu.Item>
      <Menu.Item key={ROUTES.MAP}>
        <Link to={ROUTES.MAP}>Map</Link>
      </Menu.Item>
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
        {isAuthenticated ? "Log out" : "Log In"}
      </Menu.Item>
    </Menu>
  );
};
