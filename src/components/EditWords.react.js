import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import AxiosErrors from "../util/AxiosErrors";
import WordDraggable from "./WordDraggable";
import { Page } from "../constants/Page";

const isTouchDevice = "ontouchstart" in window;
const backendForDnd = isTouchDevice ? TouchBackend : HTML5Backend;

const EditWords = (props) => {
  const { words, setWords } = props;
  const [deletingWord, setDeletingWord] = useState(false);
  const [deletedExercise, setDeletedExercise] = useState(false);

  const deleteWord = (index) => {
    if (deletingWord) return;
    setDeletingWord(true);
    const endpoint =
      process.env.REACT_APP_API_ENDPOINT +
      "/exercise/" +
      props.exerciseId +
      "/deleteWord";
    axios
      .put(endpoint, {
        index: index,
      })
      .then((response) => {
        if (response.data.words.length > 0) setWords(response.data.words);
        else deleteExercise();
      })
      .catch((err) => {
        AxiosErrors(err);
      })
      .finally(() => setDeletingWord(false));
  };

  const deleteExercise = () => {
    const endpoint =
      process.env.REACT_APP_API_ENDPOINT + "/exercise/" + props.exerciseId;
    axios
      .delete(endpoint)
      .then((response) => {
        console.log("deleted exercise. navigating to new exercise");
        setDeletedExercise(true);
      })
      .catch((err) => {
        AxiosErrors(err);
      });
  };

  if (deletedExercise) {
    return <Navigate to={Page.exercise.link} />;
  }

  return (
    <div style={{ marginTop: "15px" }}>
      <DndProvider backend={backendForDnd}>
        {words.map((word, i) => {
          return (
            <WordDraggable
              key={word + i}
              index={i}
              exerciseId={props.exerciseId}
              word={word}
              deleteWord={deleteWord}
              isTouchDevice={isTouchDevice}
            />
          );
        })}
      </DndProvider>
    </div>
  );
};
export default EditWords;
