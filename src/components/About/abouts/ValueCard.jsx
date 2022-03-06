import React from "react";
import propTypes from "prop-types";
import ReactRoundedImage from "react-rounded-image";

ValueCard.propTypes = {
  title: propTypes.string,
  text: propTypes.string,
  pic: propTypes.any,
};

export default function ValueCard({ title, text, pic }) {
  return (
    <div>
      {pic == null || (
        <ReactRoundedImage
          image={pic}
          roundedColor="0"
          imageWidth="300"
          imageHeight="300"
          roundedSize="0"
          borderRadius="20"
        />
      )}
      <h2>{title}</h2>
      {text}
    </div>
  );
}
