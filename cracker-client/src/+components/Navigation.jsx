import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import auth from "../+utils/Auth";
import { Menu } from "antd";

export const Navigation = () => {
  const history = useHistory();

  const logout = useCallback(() => {
    auth.logout();
    history.replace("/");
  }, [history]);

  const isAuthenticated = auth.isAuthenticated();

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/map">Map</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/users">Users</Link>
      </Menu.Item>
      {isAuthenticated && (
        <Menu.Item key="4">
          <Link to="/adduser">Add a user</Link>
        </Menu.Item>
      )}
      <Menu.Item
        key="5"
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
