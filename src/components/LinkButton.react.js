import React, { Component } from "react";
import { Button, Typography } from "@mui/material";

class LinkButton extends Component {
  render() {
    const clickHandler = () => {
      if (this.props.onClick) {
        this.props.onClick();
      }
    };
    return (
      <Button
        component="button"
        size="small"
        onClick={clickHandler}
        sx={{ m: 0, p: 0 }}
      >
        <Typography>{this.props.children}</Typography>
      </Button>
    );
  }
}

export default LinkButton;
