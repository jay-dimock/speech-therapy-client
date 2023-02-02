import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import RouterLink from "./RouterLink.react";
import {
  AppBar,
  Container,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Page } from "../constants/Page";
import SessionContext from "../util/SessionContext";
import { GUEST_ID } from "../constants/Strings";

export default class PageHeader extends Component {
  static contextType = SessionContext;

  userPageKeys = new Set([
    Page.exercise.key,
    Page.startexercise.key,
    Page.editexercise.key,
    Page.reports.key,
  ]);

  render() {
    const context = this.context;
    const { currentPage } = this.props;
    const loggedIn = !!context.session.userId;
    const pages = [];
    pages.push({ ...Page.home, disabled: currentPage.key === Page.home.key });

    if (!loggedIn) {
      pages.push({
        ...Page.login,
        disabled: currentPage.key === Page.login.key,
      });
    } else {
      pages.push({
        ...Page.exercise,
        disabled: currentPage.key === Page.exercise.key,
      });
      pages.push({
        ...Page.reports,
        disabled: currentPage.key === Page.reports.key,
      });
      if (context.session.userId === GUEST_ID) {
        pages.push({
          ...Page.register,
          disabled: currentPage.key === Page.register.key,
        });
        pages.push({
          ...Page.login,
          disabled: currentPage.key === Page.login.key,
        });
      } else {
        pages.push({
          ...Page.logout,
          disabled: currentPage.key === Page.logout.key,
        });
      }
    }

    const followLink = (page) => {
      if (page.disabled) {
        return;
      }
    };

    if (!context.session.userId && this.userPageKeys.has(currentPage.key)) {
      // user is required to be logged in for these pages.
      return <Navigate to={Page.login.link_path} />;
    }
    return (
      <>
        <AppBar position="sticky" color="secondary">
          <Container maxWidth="xl">
            <Typography variant="h4">Speech Therapy</Typography>
            <Toolbar disableGutters>
              <Stack
                width="100%"
                spacing={1}
                direction={{ xs: "column", sm: "row" }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.key}
                    onClick={() => followLink(page)}
                    selected={page.disabled}
                  >
                    {(page.key === Page.register.key ||
                      page.key === Page.logout.key) && (
                      <Typography mr={1}>
                        {context.session.firstName}:
                      </Typography>
                    )}
                    <RouterLink to={page.link_path + page.menu_param}>
                      {page.link_text}
                    </RouterLink>
                    {/* <Link
                      style={{ textDecoration: "none", padding: 0 }}
                      to={page.link_path + page.menu_param}
                    >
                      <Button sx={{ padding: 0 }}>{page.link_text}</Button>
                    </Link> */}
                  </MenuItem>
                ))}
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </>
    );
  }
}
