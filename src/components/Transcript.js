import React from "react";

const wordStyle = {
  display: "inline-block",
  border: "1px solid lightgray",
  borderRadius: "6px",
  padding: "4px 8px",
  margin: "6px 4px",
};

const Transcript = (props) => {
  const arr = props.text.split(" ").filter((w) => w); //filter prevents empty strings from counting as a word
  let unique = [...new Set(arr)]; //removes duplicate words

  return (
    <div className="container" style={{ marginTop: "15px", overflow: "wrap" }}>
      <h4>Words: {unique.length}</h4>
      {unique.map((word, i) => {
        return (
          <span style={wordStyle} key={i}>
            {word}
          </span>
        );
      })}
    </div>
  );
};
export default Transcript;
