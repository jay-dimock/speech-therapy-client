import React, { Component } from "react";
import { Page } from "../constants/Page";
import SessionContext from "../util/SessionContext";
import { GUEST_ID } from "../constants/Strings";
import { Box, MenuItem, Stack, Typography } from "@mui/material";
import RouterLink from "./RouterLink.react";
import PageHeaderBrandLarge from "./PageHeaderBrandLarge.react";

class PageHeaderLarge extends Component {
  static contextType = SessionContext;
  render() {
    const { pages } = this.props;
    const { session } = this.context;

    const smHideForGuest =
      session.userId === GUEST_ID ? { xs: "none", md: "block" } : "block";

    return (
      <>
        <PageHeaderBrandLarge>Speech Therapy</PageHeaderBrandLarge>
        <Box display="inline-block" mx="auto">
          <Stack spacing={1} direction="row">
            {pages.map((page) => (
              <MenuItem
                key={page.key}
                onClick={() => {}}
                selected={page.disabled}
              >
                {(page.key === Page.register.key ||
                  page.key === Page.logout.key) && (
                  <Typography mr={1} color="secondary">
                    {session.firstName}:
                  </Typography>
                )}
                <RouterLink
                  to={page.link_path + page.menu_param}
                  sx={{
                    color: "#ffffff",
                    display:
                      page.key === Page.login.key ? smHideForGuest : "block",
                  }}
                >
                  {page.link_text}
                </RouterLink>
              </MenuItem>
            ))}
          </Stack>
        </Box>
      </>
    );
  }
}

export default PageHeaderLarge;
