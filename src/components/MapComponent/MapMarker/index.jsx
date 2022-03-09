import React from 'react';
import PropTypes from 'prop-types';
import MapPin from '../MapPin';
import { Marker } from 'react-map-gl';
import { useStore } from '../../../stores/RootStore';

MapMarker.propTypes = {
  station: PropTypes.object,
};

export default function MapMarker({ station }) {
  const {
    gasStationStore: { setSelectedGasStation },
  } = useStore();

  return (
    <Marker
      longitude={station.point[0]}
      latitude={station.point[1]}
      anchor="bottom"
    >
      <MapPin onClick={() => setSelectedGasStation(station)} />
    </Marker>
  );
}
