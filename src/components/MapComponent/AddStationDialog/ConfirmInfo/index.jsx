import React from 'react';
import { DialogContentText, Typography } from '@mui/material';
import PropTypes from 'prop-types';

ConfirmInfo.propTypes = {
  newStationInfo: PropTypes.object,
};

function ConfirmInfo({ newStationInfo }) {
  return (
    <DialogContentText component={'span'}>
      <Typography sx={{ fontWeight: 'bold' }}>Confirm information</Typography>
      <Typography>Name: {newStationInfo.name}</Typography>
      <Typography>Diesel: {newStationInfo.price.diesel}</Typography>
      <Typography>Octane95: {newStationInfo.price.octane95}</Typography>
      <Typography>Electric: {newStationInfo.price.electric}</Typography>
      <Typography sx={{ fontWeight: 'bold' }}>
        After confirming the information you can add the location of the station
        by clicking on the map and then press confirm position to finish the
        process
      </Typography>
    </DialogContentText>
  );
}

export default ConfirmInfo;
