import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

const iconStyle = {
  fontSize: "medium",
  verticalAlign: "middle",
};

const DeleteWord = (props) => {
  return (
    <ClearIcon
      style={iconStyle}
      color="secondary"
      onClick={props.action ?? false}
    />
  );
};
export default DeleteWord;
