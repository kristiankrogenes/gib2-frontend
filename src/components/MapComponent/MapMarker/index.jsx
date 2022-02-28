import React from 'react';
import PropTypes from 'prop-types';
import MapPin from '../MapPin';
import { Marker } from 'react-map-gl';

MapMarker.propTypes = {
  station: PropTypes.object,
  setPopupInfo: PropTypes.func,
};

export default function MapMarker(props) {
  const { station, setPopupInfo } = props;
  return (
    <Marker
      longitude={station.geometry.coordinates[0]}
      latitude={station.geometry.coordinates[1]}
      anchor="bottom"
    >
      <MapPin onClick={() => setPopupInfo(station)} />
    </Marker>
  );
}
