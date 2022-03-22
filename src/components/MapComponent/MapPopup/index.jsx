import React from 'react';
import { Popup } from 'react-map-gl';
import { Button } from '@mui/material';
import { useStore } from '../../../stores/RootStore';
import { fDateTime } from '../../../utils/formatTime';
import { observer } from 'mobx-react-lite';

MapPopup.propTypes = {};

function MapPopup() {
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
        {`Diesel: ${selectedGasStation.latestPrice?.diesel}`} <br />
        {`Unleaded: ${selectedGasStation.latestPrice?.unleaded}`} <br />
        {`Electric: ${selectedGasStation.latestPrice?.electric}`} <br />{' '}
        {fDateTime(selectedGasStation.latestPrice?.createdAt)}
      </div>
      <Button>More Info</Button>
      <Button>Register Price</Button>
    </Popup>
  );
}

export default observer(MapPopup);
