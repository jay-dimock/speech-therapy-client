import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import AxiosErrors from "../util/AxiosErrors";
import SessionContext from "../util/SessionContext";
import { GUEST_ID } from "../constants/Strings";

export default class RegisterButton extends Component {
  static contextType = SessionContext;

  render() {
    const { newUser, setErrors } = this.props;
    const { session, setSession } = this.context;

    const clickHandler = () => {
      const endpoint = process.env.REACT_APP_API_ENDPOINT + "/user/register";
      console.log(endpoint);
      axios
        .post(endpoint, newUser)
        .then((res) => {
          setSession({
            ...session,
            userId: res.data._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
          });
        })
        .catch((err) => {
          setErrors(AxiosErrors(err));
        });
    };

    if (session.userId && session.userId !== GUEST_ID) {
      return <Navigate to="/" />;
    }

    return (
      <Button sx={{ py: 1 }} variant="contained" onClick={clickHandler}>
        <Typography>Register</Typography>
      </Button>
    );
  }
}
