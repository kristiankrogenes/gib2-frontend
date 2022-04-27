import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Button, Autocomplete, TextField, Typography } from '@mui/material';
import { RootStyle } from './styles';
import { useStore } from '../../../stores/RootStore';
import OptionsButton from './OptionsButton';

MapToolbar.propTypes = {
  onFilterName: PropTypes.func,
  handleAddStation: PropTypes.func,
  handleClickOpen: PropTypes.func,
  addGas: PropTypes.bool,
  handleOptimizedRouteFuzzy: PropTypes.func,
  resetOptimizedRoutes: PropTypes.func,
  handleOptimizedRoute: PropTypes.func,
  handleOptimizedRouteAirDistance: PropTypes.func,
  handleShowAll: PropTypes.func,
  showAll: PropTypes.bool,
};

export default function MapToolbar(props) {
  const {
    onFilterName,
    handleAddStation,
    handleClickOpen,
    addGas,
    handleOptimizedRouteFuzzy,
    handleOptimizedRouteAirDistance,
    handleOptimizedRoute,
    handleShowAll,
    showAll,
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
      {!addGas ? (
        <>
          {/* <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleOptimizedRouteAirDistance}
          >
            Optimized Route
          </Button> */}
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleShowAll}
          >
            {showAll ? 'Show station inside radius' : 'Show all stations'}
          </Button>
        </>
      ) : null}
      {addGas ? (
        <Typography>
          Click on the map, and then click the button to add a station
        </Typography>
      ) : null}
      <Button
        variant="contained"
        onClick={handleClickAddStation}
        startIcon={<Icon icon={plusFill} />}
      >
        {addGas ? 'Confirm position' : 'Add station'}
      </Button>
      {/* <Button
        variant="contained"
        startIcon={<Icon icon={plusFill} />}
        onClick={() => handleOptimizedRoute()}
      >
        Optimized Route
      </Button> */}
      <OptionsButton
        handleOptimizedRouteFuzzy={handleOptimizedRouteFuzzy}
        handleOptimizedRouteAirDistance={handleOptimizedRouteAirDistance}
      />
    </RootStyle>
  );
}
