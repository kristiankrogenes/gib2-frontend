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
      <Typography>Price: {newStationInfo.price}</Typography>
    </DialogContentText>
  );
}

export default ConfirmInfo;
