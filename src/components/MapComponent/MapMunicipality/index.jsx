import { Box, Card, Button } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
// import Map, { GeolocateControl, Layer, Source, Marker } from 'react-map-gl';
import MapGL, {
  GeolocateControl,
  Layer,
  Source,
  Marker,
} from '@urbica/react-map-gl';
// import { useStore } from '../../stores/RootStore';
// import AddStationDialog from './AddStationDialog';
// import {
//   // initialViewState,
//   MAPBOX_TOKEN,
//   mapStyle,
//   lerka,
//   heimdal,
//   lineLayerStyle,
// } from './constants';
// import {
//   makeMarkerFromMapClick,
//   createGeoJson,
//   optimizedRoute,
//   ClusterMarker,
// } from './helpers';
// // import MapMarker from './MapMarker';
// import MapPin from './MapPin';
// import MapPopup from './MapPopup';
// import MapToolbar from './MapToolbar';
import axios from 'axios';

// import Cluster from '@urbica/react-map-gl-cluster';

// function MapMunicipality() {
//   const [viewport, setViewport] = useState({
//     latitude: lerka.lat,
//     longitude: lerka.lng,
//     width: '100vw',
//     height: '100vh',
//     zoom: 12,
//   });

function MapMunicipality() {
  const [municipalities, getMuniciplaities] = useState('');

  useEffect(() => {
    getAllMunicipalities();
  }, []);

  const getAllMunicipalities = () => {
    axios
      .get(
        'https://ws.geonorge.no/kommuneinfo/v1/kommuner/illustrasjonskart?utkoordsys=4326'
      )
      .then((response) => {
        const allMunicipalities = response.data;
        getMuniciplaities(allMunicipalities);
      })
      .catch((error) => console.error('Error'));
  };

  const buttonClick = () => {
    console.log(municipalities.features[0].geometry.coordinates);
  };

  return (
    <Button onClick={buttonClick}>Hent kommuner</Button>
    // <Source id="test" type="geojson" data={municipalities.features[0].geometry}>
    //   {/* <Layer /> */}
    // </Source>
  );
}

export default observer(MapMunicipality);
