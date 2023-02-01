import React, { Component } from "react";
import { Link as RLink } from "react-router-dom";

import LinkButton from "./LinkButton.react";

class RouterLink extends Component {
  render() {
    return (
      <RLink to={this.props.to}>
        <LinkButton>{this.props.children}</LinkButton>
      </RLink>
    );
  }
}

export default RouterLink;
