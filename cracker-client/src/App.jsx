import React, { Component } from "react";
import auth from "./+utils/Auth";
import { withRouter } from "react-router-dom";

import "antd/dist/antd.css";
import { Layout } from "antd";
import { AppName } from "./+components/AppName";

import { Switch, Route } from "react-router-dom";
import { Callback } from "./+components/Callback";
import { Home } from "./home/Home";
import { Users } from "./users/Users";
import { AddUser } from "./users/AddUser";
import { MapView } from "./map/MapView";
import { Navigation } from "./+components/Navigation";
import styled from "styled-components";

const { Header, Content, Footer } = Layout;

const Container = styled(Content)`
  padding: 50px;
`;

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
      <Layout>
        <Header>
          <AppName>Cracker</AppName>
          <Navigation />
        </Header>
        <Container>
          <Switch>
            <Route exact path="/callback" component={Callback} />
            <Route path="/adduser" component={AddUser} />
            <Route path="/users" component={Users} />
            <Route path="/map" component={MapView} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
        <Footer style={{ textAlign: "center" }}>
          Cracker app ©2020 Created by Michał J. Gąsior
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(App);
