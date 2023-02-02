import React, { Component } from "react";
import { Link as RLink } from "react-router-dom";
import LinkButton from "./LinkButton.react";

class RouterLink extends Component {
  render() {
    const page = this.props.page;
    const to = page ? page.link_path : this.props.to;
    const children = page ? page.link_text : this.props.children;
    const sx = this.props.sx ?? null;
    return (
      <RLink to={to}>
        <LinkButton sx={sx}>{children}</LinkButton>
      </RLink>
    );
  }
}
export default RouterLink;
