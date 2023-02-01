import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import SessionContext from "../util/SessionContext";
import { GUEST_ID, GUEST_NAME } from "../constants/Strings";
import LinkButton from "../components/LinkButton.react";

export default class LoginGuest extends Component {
  constructor(props) {
    super(props);
    this.state = { done: false };
  }

  static contextType = SessionContext;

  clickHandler = () => {
    console.log("handlingcliuck");
    this.context.setSession({
      userId: GUEST_ID,
      firstName: GUEST_NAME,
    });
    this.setState({ done: true });
  };

  render() {
    return this.state.done === true ? (
      <Navigate to="/" />
    ) : (
      <LinkButton onClick={this.clickHandler}>Log in as Guest</LinkButton>
    );
  }
}
