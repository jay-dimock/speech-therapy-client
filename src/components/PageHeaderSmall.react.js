import React, { Component } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import { Page } from "../constants/Page";
import SessionContext from "../util/SessionContext";
import PageHeaderBrandSmall from "./PageHeaderBrandSmall.react";
import RouterLink from "./RouterLink.react";

class PageHeaderSmall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElNav: null,
    };
  }

  static contextType = SessionContext;
  render() {
    const { pages } = this.props;
    const { session } = this.context;
    const { anchorElNav } = this.state;
    const handleOpenMenu = (event) => {
      this.setState({ ...this.state, anchorElNav: event.currentTarget });
    };
    const handleCloseMenu = () => {
      this.setState({ ...this.state, anchorElNav: null });
    };
    const clickHandler = (disabled) => {
      if (disabled) {
        handleCloseMenu();
      }
    };
    return (
      <>
        <PageHeaderBrandSmall openMenu={handleOpenMenu}>
          Speech Therapy
        </PageHeaderBrandSmall>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseMenu}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.key}
              onClick={() => clickHandler(page.disabled)}
              selected={page.disabled}
            >
              {(page.key === Page.register.key ||
                page.key === Page.logout.key) && (
                <Typography mr={1}>{session.firstName}:</Typography>
              )}
              <RouterLink to={page.link_path + page.menu_param}>
                {page.link_text}
              </RouterLink>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
}

export default PageHeaderSmall;
