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
        Enter prices of gas station
      </Typography>
      <TextField
        value={newStationInfo.price.diesel}
        onChange={(e) =>
          setNewStationInfo({
            name: newStationInfo.name,
            price: {
              unleaded: newStationInfo.price.unleaded,
              electric: newStationInfo.price.electric,
              diesel: e.target.value,
            },
          })
        }
        label="Diesel Price"
      >
        Diesel Price
      </TextField>
      <TextField
        value={newStationInfo.price.unleaded}
        onChange={(e) =>
          setNewStationInfo({
            name: newStationInfo.name,
            price: {
              diesel: newStationInfo.price.diesel,
              electric: newStationInfo.price.electric,
              unleaded: e.target.value,
            },
          })
        }
        label="Unleaded Price"
      >
        Unleaded Price
      </TextField>
      <TextField
        value={newStationInfo.price.electric}
        onChange={(e) =>
          setNewStationInfo({
            name: newStationInfo.name,
            price: {
              unleaded: newStationInfo.price.unleaded,
              diesel: newStationInfo.price.diesel,
              electric: e.target.value,
            },
          })
        }
        label="Electric Price"
      >
        Electric Price
      </TextField>
    </DialogContentText>
  );
}

export default StationPrice;
