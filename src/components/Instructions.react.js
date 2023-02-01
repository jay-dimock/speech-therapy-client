import React, { Component } from "react";
import { Box, Link } from "@mui/material";
import RouterLink from "../components/RouterLink.react";
import { Page } from "../constants/Page";

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = { show: props.show || props.alwaysShow || false };
  }

  toggleShow = () => {
    this.setState((state) => ({ show: !state.show }));
  };

  render() {
    const show = this.state.show;
    return (
      <Box>
        {show && <h2 style={{ marginBottom: "0" }}>Instructions</h2>}
        {!show && <div style={{ marginTop: "20px" }}></div>}

        {!this.props.alwaysShow && (
          <Link
            style={{ marginBottom: "0.5rem" }}
            component="button"
            onClick={this.toggleShow}
          >
            {show ? "Hide Instructions" : "Instructions"}
          </Link>
        )}

        {show && (
          <Box>
            <h3>How it works</h3>
            <ul className="spaced">
              <li>
                You will be shown a random category. For example: "Words that
                begin with B".
              </li>
              <li>
                A 60 second timer will start. Speak as many words as you can
                that match the category.
              </li>
              <li>
                The words you speak will display on the screen, often with a
                delay of a second or two.
              </li>
              <li>
                Sometimes the speech recognition software will not hear you
                correctly. That's okay; you'll be able to edit your answers
                after the exercise is complete.
              </li>
              <li>
                When the timer reaches zero, you'll be taken to a results view
                where you can delete and/or edit incorrect words.
              </li>
            </ul>
            <h3>Tips</h3>
            <ul className="spaced">
              <li>
                If you can't think of any words in the category provided, click
                the "New Category" button.
              </li>
              <li>
                If you've said as many words as you can, and don't want to wait
                for the timer to finish, click the "Quit Early" button.
              </li>
              <li>
                Sometimes an answer is made up of more than one word. For
                example, "North Carolina". The speech software will record this
                as two separate words. When you get to the results screen, you
                can combine them back into one word by dragging and dropping one
                word onto another.
              </li>
              <li>
                To go back and edit the exercise later, you can access it from
                the{" "}
                <RouterLink to={Page.reports.link_path}>
                  {Page.reports.link_text}
                </RouterLink>{" "}
                page.{" "}
                <i>
                  You can only edit today's exercises. Earlier dates cannot be
                  modified.
                </i>
              </li>
            </ul>
            <h3>FAQ</h3>
            <h4>
              How does the software know if a word belongs in the category?
            </h4>
            <p>
              It doesn't. It simply listens to your voice and records the words.
              When you edit the exercise, YOU decide if the word really belongs
              to the category. If it does not, you should delete the word.
            </p>
          </Box>
        )}
      </Box>
    );
  }
}
