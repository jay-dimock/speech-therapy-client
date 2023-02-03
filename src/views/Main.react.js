import React, { Component } from "react";
import { Link, Typography } from "@mui/material";
import SessionContext from "../util/SessionContext";
import Instructions from "../components/Instructions.react";
import { Page, ExerciseParam } from "../constants/Page";
import PageWrapper from "../components/PageWrapper.react";
import RouterLink from "../components/RouterLink.react";

export default class Main extends Component {
  static contextType = SessionContext;

  render() {
    const exercise = Page.exercise;
    return (
      <PageWrapper page={Page.home}>
        <Typography>
          This site provides a specific type of cognitive speech therapy
          exercise: thinking of and speaking words to match categories. This is
          done using the{" "}
          <Link href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition">
            Speech Recognition Web API
          </Link>{" "}
          to record spoken words. Currently, the Speech Recognition API only
          works with the Chrome browser, and only if the user is NOT using iOS
          (iPhone, iPad). This may change in the future. See "Browser Support"
          on{" "}
          <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API#Browser_support">
            this page
          </Link>{" "}
          for updates.
        </Typography>
        {!this.context.session.userId && (
          <>
            <Instructions alwaysShow={true} />
            <Typography>
              Ready to begin? <RouterLink page={Page.login} />
            </Typography>
          </>
        )}
        {this.context.session.userId && (
          <Typography mt={1}>
            Get started:{" "}
            <RouterLink to={exercise.link_path + ExerciseParam.instructions}>
              Exercises / Instructions
            </RouterLink>
          </Typography>
        )}
      </PageWrapper>
    );
  }
}
