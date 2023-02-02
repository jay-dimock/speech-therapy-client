import React, { Component } from "react";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { Page } from "../constants/Page";
import PageWrapper from "../components/PageWrapper.react";
import LoginButton from "../components/LoginButton.react";
import LoginGuest from "../components/LoginGuest.react";
import RouterLink from "../components/RouterLink.react";
import SessionContext from "../util/SessionContext";
import { GUEST_ID } from "../constants/Strings";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  static contextType = SessionContext;

  handleTextChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };

  setErrors = (newErrors) => {
    this.setState({ ...this.state, errors: newErrors });
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <PageWrapper page={Page.login}>
        <Stack
          spacing={2}
          direction={"column"}
          width={{ xs: "100%", sm: "500px" }}
          sx={{ my: 2 }}
        >
          <FormControl>
            <TextField
              id="email"
              size="small"
              value={email}
              onChange={this.handleTextChange}
              label={<Typography>Email address</Typography>}
              error={!!errors["email"]}
              helperText={errors["email"]}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="password"
              size="small"
              value={password}
              onChange={this.handleTextChange}
              label={<Typography>Password</Typography>}
              error={!!errors["password"]}
              helperText={errors["password"]}
              type="password"
            />
          </FormControl>
        </Stack>
        <LoginButton
          email={email}
          password={password}
          setErrors={this.setErrors}
        />
        <Typography mt={1.5}>
          New user? <RouterLink page={Page.register} />
        </Typography>
        {this.context.session?.userId !== GUEST_ID && (
          <Typography>
            Or: <LoginGuest />
          </Typography>
        )}
      </PageWrapper>
    );
  }
}
