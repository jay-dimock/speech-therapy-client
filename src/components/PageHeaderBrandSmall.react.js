import React, { Component } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

class PageHeaderBrandSmall extends Component {
  render() {
    return (
      <Box sx={{ mx: "auto", display: "inline-block" }}>
        <Stack spacing={1} direction="row" sx={{ alignItems: "center", m: 0 }}>
          <IconButton
            size="medium"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.props.openMenu}
          >
            <MenuIcon
              fontSize={"large"}
              color="secondary"
              sx={{ verticalAlign: "middle" }}
            />
          </IconButton>

          <Typography
            fontSize="1.5em"
            color="secondary"
            fontWeight={700}
            noWrap
          >
            {this.props.children}
          </Typography>
        </Stack>
      </Box>
    );
  }
}

export default PageHeaderBrandSmall;
