import React, { Component } from "react";
import auth from "../+utils/Auth";

export class Callback extends Component {
  async componentDidMount() {
    await auth.handleAuthentication();
    this.props.history.replace("/");
  }

  render() {
    return <div>Loading...</div>;
  }
}
