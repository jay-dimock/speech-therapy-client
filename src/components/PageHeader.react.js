import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
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
                      <Typography>{context.session.firstName}:</Typography>
                    )}
                    <Link
                      style={{ textDecoration: "none", padding: 0 }}
                      to={page.link_path + page.menu_param}
                    >
                      <Button sx={{ padding: 0 }}>{page.link_text}</Button>
                    </Link>
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
