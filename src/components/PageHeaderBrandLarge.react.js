import React, { Component } from "react";
import { Box, Stack, Typography } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

class PageHeaderBrandLarge extends Component {
  render() {
    return (
      <Box display="block">
        <Box sx={{ mt: 2, mx: "auto", display: "inline-block" }}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ alignItems: "center", m: 0 }}
          >
            <RecordVoiceOverIcon
              fontSize={"large"}
              color="secondary"
              sx={{ verticalAlign: "middle" }}
            />
            <Typography
              fontSize={"2em"}
              color="secondary"
              fontWeight={600}
              noWrap
            >
              {this.props.children}
            </Typography>
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default PageHeaderBrandLarge;
