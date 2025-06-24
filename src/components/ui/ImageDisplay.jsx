import React from "react";

const ImageDisplay = ({ url }) => {
  return (
    <img src={url} alt="image" style={{ width: "200px", height: "auto" }} />
  );
};

export default ImageDisplay;
