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
      <Typography sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
        Add inn all prices to the gas station (has to be a positive integer)
        {/* Legg inn alle prisene til bensinstasjonen(må være et positivt tall) */}
      </Typography>
      <TextField
        sx={{ marginBottom: '10px', marginRight: '10px' }}
        value={newStationInfo.price.diesel}
        onChange={(e) =>
          setNewStationInfo({
            name: newStationInfo.name,
            price: {
              octane95: newStationInfo.price.octane95,
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
        value={newStationInfo.price.octane95}
        onChange={(e) =>
          setNewStationInfo({
            name: newStationInfo.name,
            price: {
              diesel: newStationInfo.price.diesel,
              electric: newStationInfo.price.electric,
              octane95: e.target.value,
            },
          })
        }
        label="Octane95 Price"
      >
        Octane95 Price
      </TextField>
      <TextField
        value={newStationInfo.price.electric}
        onChange={(e) =>
          setNewStationInfo({
            name: newStationInfo.name,
            price: {
              octane95: newStationInfo.price.octane95,
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
