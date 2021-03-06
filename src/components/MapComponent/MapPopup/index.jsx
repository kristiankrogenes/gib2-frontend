import React from 'react';
import { Popup } from 'react-map-gl';
// import { Popup } from '@urbica/react-map-gl';
import { Button } from '@mui/material';
import { useStore } from '../../../stores/RootStore';
import { fDateTime } from '../../../utils/formatTime';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';

MapPopup.propTypes = {
  handleClickOpenUpdatePrice: PropTypes.func,
};

function MapPopup({ handleClickOpenUpdatePrice }) {
  const {
    gasStationStore: { selectedGasStation, setSelectedGasStation },
  } = useStore();

  return (
    <Popup
      anchor="top"
      longitude={selectedGasStation.point[0]}
      latitude={selectedGasStation.point[1]}
      closeOnClick={false}
      onClose={() => setSelectedGasStation(null)}
    >
      <div>
        <div style={{ fontWeight: 'bold' }}>{selectedGasStation.name}</div>
        Last registered prices: <br />
        {`Diesel: ${
          selectedGasStation.latestPrice.diesel
            ? Math.round(selectedGasStation.latestPrice?.diesel * 100) / 100
            : 'Ingen pris'
        }`}{' '}
        <br />
        {`Octane95: ${
          selectedGasStation.latestPrice.octane95
            ? Math.round(selectedGasStation.latestPrice.octane95 * 100) / 100
            : 'Ingen pris'
        }`}{' '}
        <br />
        {`Electric: ${
          selectedGasStation.latestPrice.electric
            ? Math.round(selectedGasStation.latestPrice.electric * 100) / 100
            : 'Ingen pris'
        }`}{' '}
        <br /> {fDateTime(selectedGasStation.latestPrice?.createdAt)}
      </div>
      <Button variant="outlined" onClick={handleClickOpenUpdatePrice}>
        Register Price
      </Button>
    </Popup>
  );
}

export default observer(MapPopup);
