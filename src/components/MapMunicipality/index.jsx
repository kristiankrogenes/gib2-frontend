import { Box, Card, Button } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useMemo } from 'react';
import Map, { Layer, Source } from 'react-map-gl';
import {
  initialViewState,
  MAPBOX_TOKEN,
  mapStyle,
  layerStyle,
} from './constants';
import axios from 'axios';
import { updatePercentiles } from '../../utils/updatePercentiles';

function MapMunicipality() {
  const [municipalities, setMunicipalities] = useState(null);

  const buttonClick = () => {
    axios
      .get(
        'https://ws.geonorge.no/kommuneinfo/v1/kommuner/illustrasjonskart?utkoordsys=4326'
      )
      .then((response) => {
        const all = response.data;
        all.features = all.features.map((e) => ({
          ...e,
          properties: {
            ...e.properties,
            kommunenummer2: parseInt(e.properties.kommunenummer.substr(0, 2)),
          },
        }));
        console.log(all);
        setMunicipalities(all);
      })
      .catch((error) => console.error('Error'));
  };

  const data = useMemo(() => {
    return (
      municipalities &&
      updatePercentiles(municipalities, (f) => f.properties.kommunenummer2)
    );
  }, [municipalities]);

  return (
    <Card>
      <Button onClick={buttonClick}>TEST</Button>

      <Box
        sx={{
          width: '100%',
          height: 600,
        }}
      >
        <Map
          initialViewState={initialViewState}
          mapStyle={mapStyle}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {municipalities && (
            <Source id="test" type="geojson" data={data}>
              <Layer {...layerStyle} />
            </Source>
          )}
        </Map>
      </Box>
    </Card>
  );
}

export default MapMunicipality;
