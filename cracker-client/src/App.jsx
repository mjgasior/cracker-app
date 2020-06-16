import React, { Component } from "react";
import auth from "./+utils/Auth";
import { withRouter } from "react-router-dom";

import "antd/dist/antd.css";
import { Layout } from "antd";
import { Logo } from "./+components/Logo";

import { Switch, Route } from "react-router-dom";
import { Callback } from "./+components/Callback";
import { Home } from "./home/Home";
import { MapView } from "./map/MapView";
import { Navigation } from "./+components/Navigation";
import styled from "styled-components";
import { MarkersView } from "./markers/MarkersView";
import { ROUTES } from "./+utils/routes";

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
          <Logo />
          <Navigation />
        </Header>
        <Container>
          <Switch>
            <Route exact path={ROUTES.CALLBACK} component={Callback} />
            <Route path={ROUTES.MARKERS} component={MarkersView} />
            <Route path={ROUTES.MAP} component={MapView} />
            <Route path={ROUTES.HOME} component={Home} />
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
