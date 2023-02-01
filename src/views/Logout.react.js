import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import SessionContext from "../util/SessionContext";

export default class Logout extends Component {
  static contextType = SessionContext;
  // shouldComponentUpdate() {
  //   return false;
  // }
  componentDidMount() {
    this.context.setSession({});
  }
  render() {
    return <Navigate to="/" />;
  }
}
