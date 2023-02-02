import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import RouterLink from "./RouterLink.react";
import {
  AppBar,
  Box,
  Container,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Page } from "../constants/Page";
import SessionContext from "../util/SessionContext";
import { GUEST_ID } from "../constants/Strings";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

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

    if (!context.session.userId && this.userPageKeys.has(currentPage.key)) {
      // user is required to be logged in for these pages.
      return <Navigate to={Page.login.link_path} />;
    }

    const isGuest = context.session.userId === GUEST_ID;

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
      if (isGuest) {
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

    const xsShow = { xs: "block", sm: "none" };
    const xsHide = { xs: "none", sm: "block" };
    const smHideForGuest = isGuest ? { xs: "none", md: "block" } : "block";
    return (
      <>
        <AppBar position="sticky" elevation={0} sx={{ textAlign: "center" }}>
          <Container maxWidth="xl">
            <Box
              display="block"
              sx={{ mt: 2, mx: "auto", display: "inline-block" }}
            >
              <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                <RecordVoiceOverIcon
                  fontSize={"large"}
                  color="secondary"
                  sx={{ display: xsHide }}
                />
                <Typography fontSize={"2em"} color="secondary">
                  Speech Therapy
                </Typography>
              </Stack>
            </Box>
            <Toolbar
            // disableGutters
            // if disabled, menu will align left instead of center
            >
              <Stack
                spacing={1}
                direction={{ xs: "column", sm: "row" }}
                sx={{ mx: "auto" }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.key}
                    onClick={() => followLink(page)}
                    selected={page.disabled}
                  >
                    {(page.key === Page.register.key ||
                      page.key === Page.logout.key) && (
                      <Typography mr={1} color="secondary">
                        {context.session.firstName}:
                      </Typography>
                    )}
                    {/* <RouterLink to={page.link_path + page.menu_param}>
                      <span color="white">{page.link_text}</span>
                    </RouterLink> */}
                    <RouterLink
                      sx={{
                        color: "#ffffff",
                        display:
                          page.key === Page.login.key
                            ? smHideForGuest
                            : "block",
                      }}
                      to={page.link_path + page.menu_param}
                    >
                      {page.link_text}
                    </RouterLink>
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
