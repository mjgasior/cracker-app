import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import auth from "../+utils/Auth";

class Callback extends Component {
  async componentDidMount() {
    await auth.handleAuthentication();
    this.props.history.replace("/");
  }

  render() {
    return <div>Loading...</div>;
  }
}

export default withRouter(Callback);
