import React from 'react';
import { TextField, DialogContentText, Typography } from '@mui/material';
import PropTypes from 'prop-types';

StationName.propTypes = {
  newStationInfo: PropTypes.object,
  setNewStationInfo: PropTypes.func,
};

function StationName({ newStationInfo, setNewStationInfo }) {
  return (
    <DialogContentText component={'span'}>
      <Typography sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
        Skriv inn navnet til bensinstasjonen
      </Typography>
      <TextField
        value={newStationInfo.name}
        onChange={(e) =>
          setNewStationInfo({
            ...newStationInfo,
            name: e.target.value,
          })
        }
        label="Name"
      >
        Name
      </TextField>
    </DialogContentText>
  );
}

export default StationName;
