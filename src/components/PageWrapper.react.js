import React, { Component } from "react";
import PageHeader from "../components/PageHeader.react";
import { Container, Typography } from "@mui/material";

export default class PageWrapper extends Component {
  render() {
    const { page, responsive, children } = this.props;
    const isResponsive = responsive ?? true;
    const textAlignment = isResponsive
      ? { xs: "left", sm: "center" }
      : "center";
    return (
      <>
        <PageHeader currentPage={page} />
        <Container maxWidth="md" sx={{ textAlign: textAlignment }}>
          <Typography variant="h5" my={1} fontWeight="bold">
            {page?.link_text}
          </Typography>
          {children}
        </Container>
      </>
    );
  }
}
