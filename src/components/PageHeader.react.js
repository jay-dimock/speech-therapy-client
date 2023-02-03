import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { AppBar, Box } from "@mui/material";
import { Page } from "../constants/Page";
import SessionContext from "../util/SessionContext";
import { GUEST_ID } from "../constants/Strings";
import PageHeaderLarge from "./PageHeaderLarge.react";
import PageHeaderSmall from "./PageHeaderSmall.react";

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

    if (!loggedIn && this.userPageKeys.has(currentPage.key)) {
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

    const smallScreen = { xs: "block", sm: "none" };
    const largeScreen = { xs: "none", sm: "block" };

    return (
      <>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{ textAlign: { xs: "left", sm: "center" } }}
        >
          <Box sx={{ display: smallScreen }}>
            <PageHeaderSmall pages={pages} />
          </Box>
          <Box sx={{ display: largeScreen }}>
            <PageHeaderLarge pages={pages} />
          </Box>
        </AppBar>
      </>
    );
  }
}
