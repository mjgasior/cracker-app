import React, { Component } from "react";
import auth from "./+utils/Auth";
import { withRouter } from "react-router-dom";

import "antd/dist/antd.css";
import { Layout } from "antd";
import { AppName } from "./+components/AppName";

import { Switch, Route } from "react-router-dom";
import Callback from "./+components/Callback";
import { Home } from "./+components/Home";
import { Users } from "./+components/Users";
import { AddUser } from "./+components/AddUser";
import Navigation from "./+components/Navigation";

const { Header, Content, Footer } = Layout;

class App extends Component {
  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      return;
    }

    try {
      await auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === "login_required") {
        return;
      }
      console.log(err.error);
    }
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <AppName>Cracker</AppName>
          <Navigation />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Switch>
            <Route exact path="/callback" component={Callback} />
            <Route path="/adduser" component={AddUser} />
            <Route path="/users" component={Users} />
            <Route path="/" component={Home} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Cracker app ©2020 Created by Michał J. Gąsior
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(App);
