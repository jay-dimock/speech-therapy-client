import React, { Component } from "react";
import { Button, Typography } from "@mui/material";

class LinkButton extends Component {
  render() {
    const clickHandler = () => {
      if (this.props.onClick) {
        this.props.onClick();
      }
    };
    const sx = this.props.sx ?? { m: 0, p: 0 };
    return (
      <Button size="small" onClick={clickHandler} sx={sx}>
        <Typography>{this.props.children}</Typography>
      </Button>
    );
  }
}

export default LinkButton;
