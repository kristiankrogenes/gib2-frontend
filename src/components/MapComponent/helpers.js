import React from 'react';
import { Marker } from 'react-map-gl';
// import { Marker } from '@urbica/react-map-gl';
import MapPin from './MapPin';
import axiosInstance from '../../utils/axios';
import { feature, featureCollection } from 'turf';

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

export const createGeoJson = (geometry) => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: geometry.trips[0].geometry.type,
          coordinates: geometry.trips[0].geometry.coordinates,
        },
      },
    ],
  };
};

export const optimizedRouteURL = (start, end) =>
  `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?roundtrip=false&source=first&destination=last&steps=true&geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

export const makeMarkerFromMapClick = (e) => ({
  marker: (
    <Marker
      longitude={e.lngLat.lng}
      latitude={e.lngLat.lat}
      anchor="bottom"
      // draggable={true}
    >
      <MapPin onClick={() => null} isNew={true} />
    </Marker>
  ),
  coordinates: e.lngLat,
});

export const getOptimizedRoutesFuzzy = async (start, fuelType, weight) => {
  // preventDefault();
  const res = await axiosInstance.get('api/fuzzy/', {
    params: {
      start_lng: start.coordinates.lng,
      start_lat: start.coordinates.lat,
      price_weight: weight,
      duration_weight: 1 - weight,
      fuel_type: fuelType,
    },
  });
  return featureCollection([feature(res.data.geometry)]);
};

export const getOptimizedRoutesAirDistance = async (start) => {
  const res = await axiosInstance.get('api/or-distance/', {
    params: {
      start_lng: start.coordinates.lng,
      start_lat: start.coordinates.lat,
    },
  });
  return featureCollection([feature(res.data.geometry)]);
};

// export const ClusterMarker = ({ longitude, latitude, pointCount }) => {
//   ClusterMarker.propTypes = {
//     longitude: PropTypes.number,
//     latitude: PropTypes.number,
//     pointCount: PropTypes.number,
//   };
//   return (
//     <Marker longitude={longitude} latitude={latitude}>
//       <MapPin size={10 * pointCount} onClick={() => console.log('test')} />
//     </Marker>
//   );
// };
