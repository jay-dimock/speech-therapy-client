import React, { Component } from "react";
import PageHeader from "../components/PageHeader.react";
import { Container, Typography } from "@mui/material";

export default class PageWrapper extends Component {
  render() {
    const { page, children } = this.props;
    return (
      <>
        <PageHeader currentPage={page} />
        <Container maxWidth="xl" sx={{ textAlign: "center" }}>
          <Typography variant="h5" my={1}>
            {page?.link_text}
          </Typography>
          {children}
        </Container>
      </>
    );
  }
}
