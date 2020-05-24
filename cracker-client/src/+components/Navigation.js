import React from "react";
import { Link } from "./Link";
import { withRouter } from "react-router-dom";
import auth from "../+utils/Auth";
import { Menu } from "antd";

const Navigation = () => {
  const logout = () => {
    auth.logout();
    this.props.history.replace("/");
  };

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="3">
        {auth.isAuthenticated() && <Link to="/adduser">Add a user</Link>}
      </Menu.Item>
      <Menu.Item
        key="4"
        onClick={() => {
          if (auth.isAuthenticated()) {
            logout();
          } else {
            auth.login();
          }
        }}
      >
        {auth.isAuthenticated() ? "Log out" : "Log In"}
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(Navigation);
