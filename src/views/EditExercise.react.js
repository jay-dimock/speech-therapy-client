import React, { Component } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { Button, Link, Typography } from "@mui/material";
import FlipToFrontIcon from "@mui/icons-material/FlipToFront";
import SessionContext from "../util/SessionContext";
import PageWrapper from "../components/PageWrapper.react";
import { Page } from "../constants/Page";
import EditWords from "../components/EditWords.react";
import AxiosErrors from "../util/AxiosErrors";
import DeleteWord from "../components/DeleteWord.react";

class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      words: [],
      loaded: false,
      showInstructions: props.show || props.alwaysShow || false,
      startOver: false,
    };
  }
  static contextType = SessionContext;

  componentDidMount() {
    const exerciseId = this.props.params.id;
    const endpoint =
      process.env.REACT_APP_API_ENDPOINT + "/exercise/" + exerciseId;
    axios
      .get(endpoint)
      .then((response) => {
        this.setState({
          ...this.state,
          category: response.data.category,
          words: response.data.words,
          loaded: true,
        });
      })
      .catch((err) => {
        AxiosErrors(err);
      });
  }

  render() {
    const { category, words, loaded, showInstructions } = this.state;
    const startOverClickHandler = () => {
      this.setState({ ...this.state, startOver: true });
    };
    const toggleInstructions = () => {
      this.setState({
        ...this.state,
        showInstructions: !this.state.showInstructions,
      });
    };
    const setWords = (value) => {
      this.setState({ ...this.state, words: value });
    };
    const dragIconStyle = {
      verticalAlign: "middle",
      fontSize: "medium",
    };
    if (this.state.startOver) {
      return <Navigate to={Page.startexercise.link_path} />;
    }

    const exerciseId = this.props.params.id;
    return (
      <PageWrapper page={Page.editexercise} responsive={false}>
        <Typography variant="h5">Category: {category}</Typography>
        <Button
          variant="contained"
          onClick={startOverClickHandler}
          sx={{ my: 1 }}
        >
          Start New Exercise
        </Button>
        <Typography variant="h6">
          You recorded <b>{words.length} words!</b>
        </Typography>
        <Link mb={1} component="button" onClick={toggleInstructions}>
          <Typography>
            {showInstructions ? "Hide Instructions" : "Editing Instructions"}
          </Typography>
        </Link>
        {showInstructions && (
          <>
            <Typography my={1}>
              To edit a word, type over it (if you back-space over it, the word
              will be deleted).
            </Typography>
            <Typography my={1}>
              To combine 2 words, drag one word on top of the other using the
              drag symbol{" "}
              <FlipToFrontIcon style={dragIconStyle} color="primary" />.
            </Typography>
            <Typography my={1}>
              To delete a word, by click the delete symbol:{" "}
              <DeleteWord action={() => false} />, or back-space over the entire
              word.
            </Typography>
          </>
        )}
        {loaded && (
          <EditWords
            words={this.state.words}
            setWords={setWords}
            exerciseId={exerciseId}
          />
        )}
      </PageWrapper>
    );
  }
}

/* eslint-disable */
// https://www.appsloveworld.com/reactjs/100/3/react-router-dom-useparams-inside-class-component
// This is how to use the useParams hook with a class component
export default (props) => <EditExercise {...props} params={useParams()} />;
