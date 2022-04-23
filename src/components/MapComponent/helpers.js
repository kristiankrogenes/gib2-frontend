import React from 'react';
import { Marker } from 'react-map-gl';
// import { Marker } from '@urbica/react-map-gl';
import MapPin from './MapPin';
import { lerka } from './constants';
import axiosInstance from '../../utils/axios';
import axios from 'axios';
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
      draggable={true}
    >
      <MapPin onClick={() => null} />
    </Marker>
  ),
  coordinates: e.lngLat,
});

export const getOptimizedRoutes = async () => {
  const start = {
    lon: lerka.lng,
    lat: lerka.lat,
  };

  const response = await axiosInstance.get('api/stations-inside-radius', {
    params: start,
  });
  const nearestStations = response.data.features;
  const routes = [];

  for (let i = 0; i < nearestStations.length; i++) {
    const url = optimizedRouteURL(lerka, {
      lng: nearestStations[i].geometry.coordinates[0],
      lat: nearestStations[i].geometry.coordinates[1],
    });
    const route = await axios.get(url);
    routes.push(feature(route.data.trips[0].geometry));
  }
  return featureCollection(routes);
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
