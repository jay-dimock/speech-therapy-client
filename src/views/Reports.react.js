import React, { Component } from "react";
import PageWrapper from "../components/PageWrapper.react";
import { Page } from "../constants/Page";

class Reports extends Component {
  render() {
    return <PageWrapper page={Page.reports}></PageWrapper>;
  }
}

export default Reports;
