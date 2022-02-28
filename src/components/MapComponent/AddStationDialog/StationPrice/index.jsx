import React from 'react';
import { TextField, DialogContentText, Typography } from '@mui/material';
import PropTypes from 'prop-types';

StationPrice.propTypes = {
  newStationInfo: PropTypes.object,
  setNewStationInfo: PropTypes.func,
};

function StationPrice({ newStationInfo, setNewStationInfo }) {
  return (
    <DialogContentText component={'span'}>
      <Typography sx={{ fontWeight: 'bold' }}>
        Enter price of gas station
      </Typography>
      <TextField
        value={newStationInfo.price}
        onChange={(e) =>
          setNewStationInfo({
            ...newStationInfo,
            price: e.target.value,
          })
        }
        label="Price"
      >
        Price
      </TextField>
    </DialogContentText>
  );
}

export default StationPrice;
