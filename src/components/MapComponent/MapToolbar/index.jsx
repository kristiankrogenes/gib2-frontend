import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Button, Autocomplete, TextField } from '@mui/material';
import { RootStyle } from './styles';
import { useStore } from '../../../stores/RootStore';

MapToolbar.propTypes = {
  onFilterName: PropTypes.func,
  handleAddStation: PropTypes.func,
  handleClickOpen: PropTypes.func,
  addGas: PropTypes.bool,
  handleOptimizedRoute: PropTypes.func,
  resetOptimizedRoutes: PropTypes.func,
};

export default function MapToolbar(props) {
  const {
    onFilterName,
    handleAddStation,
    handleClickOpen,
    addGas,
    handleOptimizedRoute,
  } = props;

  const {
    gasStationStore: { getGasStationsInsideRadius },
  } = useStore();

  const handleClickAddStation = () => {
    if (!addGas) handleClickOpen();
    else handleAddStation();
  };

  return (
    <RootStyle>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        getOptionLabel={(e) => e.name}
        options={getGasStationsInsideRadius()}
        onChange={(e, newValue) => onFilterName(newValue)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Search for Gas Stations" />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
      />
      <Button
        variant="contained"
        onClick={handleClickAddStation}
        startIcon={<Icon icon={plusFill} />}
      >
        {addGas ? 'Confirm position' : 'Add station'}
      </Button>
      <Button
        variant="contained"
        startIcon={<Icon icon={plusFill} />}
        onClick={() => handleOptimizedRoute()}
      >
        Optimized Route
      </Button>
    </RootStyle>
  );
}
