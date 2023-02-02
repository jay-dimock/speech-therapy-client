import React, { Component } from "react";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { Page } from "../constants/Page";
import PageWrapper from "../components/PageWrapper.react";
import RegisterButton from "../components/RegisterButton.react";
import RouterLink from "../components/RouterLink.react";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      errors: {},
    };
  }

  handleTextChange = (e) => {
    const updatedUser = {
      ...this.state.newUser,
      [e.target.id]: e.target.value,
    };
    this.setState({ ...this.state, newUser: updatedUser });
  };

  setErrors = (newErrors) => {
    this.setState({ ...this.state, errors: newErrors });
  };

  render() {
    const { newUser, errors } = this.state;
    return (
      <PageWrapper page={Page.register}>
        <Stack
          spacing={2}
          direction={"column"}
          width={{ xs: "100%", sm: "500px" }}
          sx={{ my: 2, mx: "auto" }}
        >
          <FormControl>
            <TextField
              id="firstName"
              size="small"
              value={newUser.firstName}
              onChange={this.handleTextChange}
              label={<Typography>First name</Typography>}
              error={!!errors["firstName"]}
              helperText={errors["firstName"]}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="lastName"
              size="small"
              value={newUser.lastName}
              onChange={this.handleTextChange}
              label={<Typography>Last name</Typography>}
              error={!!errors["lastName"]}
              helperText={errors["lastName"]}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="email"
              size="small"
              value={newUser.email}
              onChange={this.handleTextChange}
              label={<Typography>Email</Typography>}
              error={!!errors["email"]}
              helperText={errors["email"]}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="password"
              size="small"
              value={newUser.password}
              onChange={this.handleTextChange}
              label={<Typography>Password</Typography>}
              error={!!errors["password"]}
              helperText={errors["password"]}
              type="password"
            />
          </FormControl>
          <FormControl>
            <TextField
              id="passwordConfirm"
              size="small"
              value={newUser.passwordConfirm}
              onChange={this.handleTextChange}
              label={<Typography>Confirm Password</Typography>}
              error={!!errors["passwordConfirm"]}
              helperText={errors["passwordConfirm"]}
              type="password"
            />
          </FormControl>
        </Stack>
        <RegisterButton newUser={newUser} setErrors={this.setErrors} />

        <Typography mt={1.5}>
          Already registered? <RouterLink page={Page.login} />
        </Typography>
      </PageWrapper>
    );
  }
}
