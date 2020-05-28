import React, { useCallback } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import auth from "../+utils/Auth";
import { Menu } from "antd";

export const Navigation = () => {
  const location = useLocation();
  const history = useHistory();

  const logout = useCallback(() => {
    auth.logout();
    history.replace("/");
  }, [history]);

  const isAuthenticated = auth.isAuthenticated();

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[location.pathname]}
    >
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/map">
        <Link to="/map">Map</Link>
      </Menu.Item>
      <Menu.Item
        key="/logout"
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
