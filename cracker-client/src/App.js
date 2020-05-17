import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Books } from "./+components/Books";
import { Home } from "./+components/Home";
import { AddBook } from "./+components/AddBook";
import { Header } from "./+components/Header";
import Navigation from "./+components/Navigation";
import { Container } from "./+components/Container";
import Callback from "./+components/Callback";
import auth from "./+utils/Auth";
import { withRouter } from "react-router-dom";

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
      <div>
        <Header>Cracker App</Header>
        <Navigation />
        <Container>
          <Switch>
            <Route exact path="/callback" component={Callback} />
            <Route path="/addbook" component={AddBook} />
            <Route path="/books" component={Books} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default withRouter(App);
