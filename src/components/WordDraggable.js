import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import axios from "axios";
import ContentEditable from "react-contenteditable";
import { Paper } from "@mui/material";
import { FlipToFront } from "@mui/icons-material";
import AxiosErrors from "../util/AxiosErrors";
import DeleteWord from "./DeleteWord";

const WordDraggable = (props) => {
  const { exerciseId, index, deleteWord, isTouchDevice } = props;
  const [word, setWord] = useState(props.word);
  const ref = useRef(null);

  const iconStyle = {
    verticalAlign: "middle",
    paddingLeft: isTouchDevice ? "10px" : "5px",
  };

  // useDrop hook is responsible for handling whether any item gets hovered or dropped on the element
  const [, drop] = useDrop({
    // Accept will make sure only these element type can be droppable on this element
    accept: "WordDraggable",
    hover(item) {
      //todo: show a tool tip with the anticipated combined words, prior to dropping?
      //console.log("hovering: " + (item.index > index ? word + " " + item.id : item.id + " " + word));
    },
    drop(item) {
      // item is the dragged element
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index; // current element where the dragged element is hovered on
      if (dragIndex === hoverIndex) return; // If the dragged element is droppedin the same place, do nothing
      combineWords(dragIndex, hoverIndex, item.id, word);

      //Update the index for dragged item directly to avoid flickering when the item was half dragged into the next
      item.index = hoverIndex;
    },
  });

  // useDrag will be responsible for making an element draggable. It also exposes isDragging method to add any styles while dragging
  const [{ isDragging }, drag] = useDrag({
    // item denotes the element type, unique identifier (id) and the index (position)
    item: { id: word, index },
    type: "WordDraggable",
    // collect method is like an event listener, it monitors whether the element is dragged and exposes that information
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  //Initialize drag and drop into the element using its reference.
  //Here we initialize both drag and drop on the same element (i.e., WordDraggable component)
  drag(drop(ref));

  const combineWords = (dragIndex, hoverIndex, dragWord, hoverWord) => {
    //console.log("dragIndex:", dragIndex, " hoverIndex:", hoverIndex);
    //always set the target index to the hover index. this is the index native to the current WordDraggable.
    const newWord =
      dragIndex > hoverIndex
        ? hoverWord + " " + dragWord
        : dragWord + " " + hoverWord;
    updateWord(newWord, dragIndex);
  };

  const updateWord = (updatedWord, deleteIndex = -1) => {
    const endpoint =
      process.env.REACT_APP_API_ENDPOINT +
      "/exercise/" +
      exerciseId +
      "/updateWord";
    axios
      .put(endpoint, {
        index: index,
        word: updatedWord,
      })
      .then((response) => {
        setWord(updatedWord);
        if (updatedWord.length === 0) deleteWord(index);
        else if (deleteIndex >= 0) deleteWord(deleteIndex);
      })
      .catch((err) => {
        AxiosErrors(err);
      });
  };

  const disableNewLines = (event) => {
    var keyCode = event.which || event.keyCode;
    keyCode === 13 && event.preventDefault();
  };

  const wordStyle = {
    display: "inline-block",
    border: "1px solid lightgray",
    borderRadius: "6px",
    padding: isTouchDevice ? "5px 10px" : "4px 8px",
    margin: isTouchDevice ? "10px 10px" : "7px 8px",
    opacity: isDragging ? 0.25 : 1,
  };

  const contentStyle = {
    display: "inline-block",
    marginLeft: isTouchDevice ? "10px" : "5px",
  };

  return (
    <Paper style={wordStyle} ref={ref}>
      <DeleteWord action={() => deleteWord(index)} />

      <ContentEditable
        style={contentStyle}
        html={word}
        onKeyPress={(e) => disableNewLines(e)}
        onChange={(e) => updateWord(e.target.value.trim())}
      />

      <FlipToFront
        style={iconStyle}
        color="primary"
        fontSize={isTouchDevice ? "large" : "small"}
      />
    </Paper>
  );
};
export default WordDraggable;
