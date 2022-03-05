import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-map-gl';
import { Button } from '@mui/material';

MapPopup.propTypes = {
  popupInfo: PropTypes.object,
  setPopupInfo: PropTypes.func,
};

export default function MapPopup({ popupInfo, setPopupInfo }) {
  return (
    <Popup
      anchor="top"
      longitude={popupInfo.point[0]}
      latitude={popupInfo.point[1]}
      closeOnClick={false}
      onClose={() => setPopupInfo(null)}
    >
      <div>
        {/* {popupInfo.geometry.coordinates[0]}, {popupInfo.geometry.coordinates[1]}
        , {'navn:'} {popupInfo.properties.name} */}
        <div style={{ fontWeight: 'bold' }}>{popupInfo.name}</div>
        Last registered price: {popupInfo.price} <br /> yesterday at 14:03
      </div>
      <Button>More Info</Button>
      <Button>Register Price</Button>
    </Popup>
  );
}
