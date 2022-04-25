import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useMemo, useState } from 'react';
import Map, { Layer, Source } from 'react-map-gl';
import { updatePercentiles } from '../../utils/updatePercentiles';
import {
  average,
  county,
  initialViewState,
  layerStyle,
  MAPBOX_TOKEN,
  mapStyle,
  municipality,
  total,
} from './constants';
import { getPolygons, getValueFunction } from './helpers';

function MapMunicipality() {
  const [munies, setMunies] = useState(null);
  const [counties, setCounties] = useState(null);
  // const [polygons, setPolygons] = useState(null);
  const [value, setValue] = useState(municipality);
  const [compareValue, setCompareValue] = useState(total);

  const handleChangeType = (event) => {
    setValue(event.target.value);
  };
  const handleChangeCompare = (event) => {
    setCompareValue(event.target.value);
  };

  useEffect(() => {
    const renderChoroplethMap = async () => {
      const polygons = await getPolygons(value);
      if (value === county && !counties) setCounties(polygons);
      else if (value === municipality && !munies) setMunies(polygons);
    };
    renderChoroplethMap();
  }, [value, counties, munies]);

  const data = useMemo(() => {
    return value === county
      ? counties && updatePercentiles(counties, getValueFunction(compareValue))
      : munies && updatePercentiles(munies, getValueFunction(compareValue));
  }, [compareValue, counties, munies, value]);

  return (
    <Card>
      <FormControl>
        <FormLabel id="id">Type</FormLabel>
        <RadioGroup
          aria-labelledby="id"
          value={value}
          onChange={handleChangeType}
        >
          <FormControlLabel value={county} control={<Radio />} label="Fylke" />
          <FormControlLabel
            value={municipality}
            control={<Radio />}
            label="Kommune"
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="id2">Atributt</FormLabel>
        <RadioGroup
          aria-labelledby="id2"
          value={compareValue}
          onChange={handleChangeCompare}
        >
          <FormControlLabel
            value={total}
            control={<Radio />}
            label="Antall bensinstasjoner"
          />
          <FormControlLabel
            value={average}
            control={<Radio />}
            label="Gjennomsnittlig dieselpris"
          />
        </RadioGroup>
      </FormControl>
      <Box sx={{ width: '100%', height: 600 }}>
        <Map
          initialViewState={initialViewState}
          mapStyle={mapStyle}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Source id="test" type="geojson" data={data}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
      </Box>
    </Card>
  );
}

export default MapMunicipality;
