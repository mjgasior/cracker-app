import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "antd/dist/antd.css";
import { Layout } from "antd";
import { Logo } from "./+components/Logo";

import { Switch, Route } from "react-router-dom";
import { Home } from "./home/Home";
import { Navigation } from "./+components/Navigation";
import styled from "styled-components";
import { MarkersView } from "./markers/MarkersView";
import { ROUTES } from "./+utils/routes";
import { ProfileView } from "./profile/ProfileView";
import { MarkersListView } from "./markersList/MarkersListView";

const { Header, Content, Footer } = Layout;

const Container = styled(Content)`
  padding: 50px;
`;

class App extends Component {
  render() {
    return (
      <Layout>
        <Header>
          <Logo />
          <Navigation />
        </Header>
        <Container>
          <Switch>
            <Route path={ROUTES.MARKERS} component={MarkersView} />
            <Route path={ROUTES.MARKERS_LIST} component={MarkersListView} />
            <Route path={ROUTES.PROFILE} component={ProfileView} />
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
