import React from 'react';
import { Popup } from 'react-map-gl';
import { Button } from '@mui/material';
import { useStore } from '../../../stores/RootStore';

MapPopup.propTypes = {};

export default function MapPopup() {
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
        Last registered price:
        {selectedGasStation.latestPrice.diesel} <br /> yesterday at 14:03
      </div>
      <Button>More Info</Button>
      <Button>Register Price</Button>
    </Popup>
  );
}
