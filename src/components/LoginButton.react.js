import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import AxiosErrors from "../util/AxiosErrors";
import SessionContext from "../util/SessionContext";

export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = { success: false };
  }

  static contextType = SessionContext;
  render() {
    const { email, password, setErrors } = this.props;
    const { session, setSession } = this.context;

    const clickHandler = () => {
      const endpoint = process.env.REACT_APP_API_ENDPOINT + "/user/login";
      const user = { email: email, password: password };
      axios
        .post(endpoint, user)
        .then((res) => {
          setSession({
            ...session,
            userId: res.data._id,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
          });
          this.setState({ success: true });
        })
        .catch((err) => {
          setErrors(AxiosErrors(err));
        });
    };

    if (this.state.success) {
      return <Navigate to="/" />;
    }

    return (
      <Button sx={{ py: 1 }} variant="contained" onClick={clickHandler}>
        <Typography>Log In</Typography>
      </Button>
    );
  }
}
