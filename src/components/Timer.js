import React from "react";
import { Card } from "@mui/material";

class Timer extends React.Component {
  render() {
    return (
      <Card style={{ maxWidth: "100px", margin: "0 auto 15px auto" }}>
        <h1>
          {this.props.minutes || "0"}:{this.props.seconds < 10 && "0"}
          {this.props.seconds}
        </h1>
      </Card>
    );
  }
}

export default Timer;
