import React, { Component } from "react";
import PageWrapper from "../components/PageWrapper.react";
import { Page } from "../constants/Page";
import SessionContext from "../util/SessionContext";
import { useParams } from "react-router-dom";
import { GUEST_ID } from "../constants/Strings";
import { Typography } from "@mui/material";
import RouterLink from "../components/RouterLink.react";
import ReportAllDates from "../components/ReportAllDates.react";
import ReportOneDate from "../components/ReportOneDate.react";
class Reports extends Component {
  static contextType = SessionContext;
  render() {
    const report = this.props.params.report || "alldates";
    const dateparam = this.props.params.param;
    if (this.context.session.userId === GUEST_ID) {
      return (
        <PageWrapper page={Page.report}>
          <Typography>
            As a Guest User, your exercises are not saved.
          </Typography>
          <Typography>
            To save your results and view them over time,
            <RouterLink page={Page.login} /> or{" "}
            <RouterLink page={Page.register} />.
          </Typography>
        </PageWrapper>
      );
    }
    return (
      <PageWrapper page={Page.reports}>
        {report === "alldates" && <ReportAllDates />}
        {report === "onedate" && <ReportOneDate date={dateparam || "today"} />}
      </PageWrapper>
    );
  }
}
/* eslint-disable */
// https://www.appsloveworld.com/reactjs/100/3/react-router-dom-useparams-inside-class-component
// This is how to use the useParams hook with a class component
export default (props) => <Reports {...props} params={useParams()} />;
