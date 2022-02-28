import React from 'react';
import { Marker } from 'react-map-gl';
import MapPin from './MapPin';

export const createPointGeojson = (point) => ({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [point.coordinates.lng, point.coordinates.lat],
      },
    },
  ],
});

export const getGasStationPOST = (marker, name, price) => ({
  name: name,
  geom: {
    type: 'Point',
    coordinates: [marker.coordinates.lng, marker.coordinates.lat],
  },
  price: parseFloat(price),
});

export const makeMarkerFromMapClick = (e) => ({
  marker: (
    <Marker
      longitude={e.lngLat.lng}
      latitude={e.lngLat.lat}
      anchor="bottom"
      draggable={true}
    >
      <MapPin onClick={() => null} />
    </Marker>
  ),
  coordinates: e.lngLat,
});
