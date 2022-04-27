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
  diesel,
  octane95,
  electric,
  county,
  initialViewState,
  layerStyle,
  MAPBOX_TOKEN,
  mapStyle,
  municipality,
  total,
} from './constants';
import { getPolygons, getValueFunction } from './helpers';
import axiosInstance from '../../utils/axios';

function ChoroplethMap() {
  const [munies, setMunies] = useState(null);
  const [counties, setCounties] = useState(null);
  // const [polygons, setPolygons] = useState(null);
  const [value, setValue] = useState(county);
  const [compareValue, setCompareValue] = useState(total);
  const [fuel, setFuel] = useState('diesel');

  const handleChangeType = (event) => {
    setValue(event.target.value);
  };
  const handleChangeCompare = (event) => {
    setCompareValue(event.target.value);
  };

  const handleChangeFuel = (event) => {
    setFuel(event.target.value);
  };

  useEffect(() => {
    const renderChoroplethMap = async () => {
      if (!counties && !munies) {
        const insight = await axiosInstance.get('api/insights/');
        let polygons = await getPolygons(county, insight);
        setCounties(polygons);
        polygons = await getPolygons(municipality, insight);
        setMunies(polygons);
      }
    };
    renderChoroplethMap();
  }, [value, counties, munies]);

  const data = useMemo(() => {
    return value === county
      ? counties &&
          updatePercentiles(counties, getValueFunction(compareValue, fuel))
      : munies &&
          updatePercentiles(munies, getValueFunction(compareValue, fuel));
  }, [compareValue, counties, munies, value, fuel]);

  return (
    <Card>
      <FormControl>
        <FormLabel id="id">Type</FormLabel>
        <RadioGroup
          aria-labelledby="id"
          value={value}
          onChange={handleChangeType}
        >
          <FormControlLabel value={county} control={<Radio />} label="County" />
          <FormControlLabel
            value={municipality}
            control={<Radio />}
            label="Municipality"
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="id2">Attribute</FormLabel>
        <RadioGroup
          aria-labelledby="id2"
          value={compareValue}
          onChange={handleChangeCompare}
        >
          <FormControlLabel
            value={total}
            control={<Radio />}
            label="Number of gas stations"
          />
          <FormControlLabel
            value={average}
            control={<Radio />}
            label="Average price"
          />
        </RadioGroup>
      </FormControl>
      {compareValue === average ? (
        <FormControl>
          <FormLabel id="id3">Fuel</FormLabel>
          <RadioGroup
            aria-labelledby="id3"
            value={fuel}
            onChange={handleChangeFuel}
          >
            <FormControlLabel
              value={octane95}
              control={<Radio />}
              label="Octane95"
            />
            <FormControlLabel
              value={diesel}
              control={<Radio />}
              label="Diesel"
            />
            <FormControlLabel
              value={electric}
              control={<Radio />}
              label="Electric"
            />
          </RadioGroup>
        </FormControl>
      ) : null}
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

export default ChoroplethMap;
