import React from 'react';
import propTypes from 'prop-types';
import ReactRoundedImage from 'react-rounded-image';
import './about.css';

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
          imageWidth="100%"
          imageHeight="250"
          roundedSize="0"
          borderRadius="20"
        />
      )}
      <h2 className="centering">{title}</h2>
      <h4 className="centering">{text}</h4>
    </div>
  );
}
