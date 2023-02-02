import React, { Component } from "react";
import { Button, Typography } from "@mui/material";
import { Link as RLink, useParams } from "react-router-dom";
import SessionContext from "../util/SessionContext";
import PageWrapper from "../components/PageWrapper.react";
import Instructions from "../components/Instructions.react";
import { Page, ExerciseParam } from "../constants/Page";
import RouterLink from "../components/RouterLink.react";

import { GUEST_ID } from "../constants/Strings";

class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = { start: false };
  }

  static contextType = SessionContext;
  render() {
    const context = this.context;
    const param = this.props.params.param;
    const restart = param === "restart";
    const notallowed = param === "notallowed";
    const buttonText =
      (restart && "Start New Category") ||
      (notallowed && "Try Again") ||
      "Start";

    return (
      <PageWrapper page={Page.exercise}>
        {param === ExerciseParam.fresh && (
          <Typography>Ready to start?</Typography>
        )}
        {restart && (
          <Typography>
            You skipped this category: {context.session.lastCategory}
          </Typography>
        )}
        {notallowed && (
          <>
            <Typography>
              Your browser has blocked microphone use for this site.
            </Typography>
            <Typography>
              In Chrome, remove the block by going to{" "}
              <b>
                Settings {">"} Site Settings {">"} Microphone
              </b>
              .
            </Typography>
          </>
        )}
        <RLink to={Page.startexercise.link_path}>
          <Button variant="contained" sx={{ mt: 2 }}>
            <Typography>{buttonText}</Typography>
          </Button>
        </RLink>
        {context.session.userId === GUEST_ID && !notallowed && (
          <Typography sx={{ maxWidth: "500px", margin: "10px auto" }}>
            As a Guest User, you can do exercises to see how it works -- but
            when the exercise is finished, you'll be taken back to this page
            without the chance to view or edit your results. For a better
            experience, please
            <RouterLink page={Page.login} />. Your personal information will not
            be shared with anyone.
          </Typography>
        )}
        <Instructions show={param === ExerciseParam.instructions} />
      </PageWrapper>
    );
  }
}
/* eslint-disable */
// https://www.appsloveworld.com/reactjs/100/3/react-router-dom-useparams-inside-class-component
// This is how to use the useParams hook with a class component
export default (props) => <Exercise {...props} params={useParams()} />;
