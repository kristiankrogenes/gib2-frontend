import { Box, Card, Grid } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useMemo, useState } from 'react';
import Map, { Layer, Source } from 'react-map-gl';
// import { updatePercentiles } from '../../utils/updatePercentiles';
import {
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
import ControlPanel from './ControlPanel';
import { range } from 'd3-array';
import { scaleQuantile } from 'd3-scale';
import { fShortenNumber } from '../../utils/formatNumber';

function ChoroplethMap() {
  const [munies, setMunies] = useState(null);
  const [counties, setCounties] = useState(null);
  const [value, setValue] = useState(county);
  const [compareValue, setCompareValue] = useState(total);
  const [fuel, setFuel] = useState('diesel');
  const [percentiles, setPercentiles] = useState([]);

  function updatePercentiles(featureCollection, accessor) {
    const { features } = featureCollection;
    const scale = scaleQuantile()
      .domain(features.map(accessor))
      .range(range(5));
    setPercentiles(scale.quantiles().map((q) => fShortenNumber(q)));
    return {
      type: 'FeatureCollection',
      features: features.map((f) => {
        const value = accessor(f);
        const properties = {
          ...f.properties,
          value,
          percentile: scale(value),
        };
        return { ...f, properties };
      }),
    };
  }

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
    <>
      <Grid item xs={12} sm={10} md={10}>
        <Card>
          <Box
            sx={{
              width: '100%',
              height: parseFloat(window.innerHeight) * 0.75,
            }}
          >
            <Map
              initialViewState={initialViewState}
              mapStyle={mapStyle}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            >
              <ControlPanel
                fuel={fuel}
                compareValue={compareValue}
                value={value}
                handleChangeCompare={handleChangeCompare}
                handleChangeFuel={handleChangeFuel}
                handleChangeType={handleChangeType}
              />
              <Source id="test" type="geojson" data={data}>
                <Layer {...layerStyle} />
              </Source>
            </Map>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={2} md={2}>
        <Card>
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '5px',
            }}
          >
            {compareValue === total
              ? 'Number of gas stations per square kilometer multiplied by 1000'
              : 'Average price'}
          </Box>
          <Box
            sx={{
              backgroundColor: 'success.lighter',
              padding: '5px',
              color: 'white',
            }}
          >
            {`≤${percentiles[0]}`}
          </Box>
          <Box
            sx={{
              backgroundColor: 'success.light',
              padding: '5px',
              color: 'white',
            }}
          >
            {`${percentiles[0]}-${percentiles[1]}`}
          </Box>
          <Box
            sx={{
              backgroundColor: 'success.main',
              padding: '5px',
              color: 'white',
            }}
          >
            {`${percentiles[1]}-${percentiles[2]}`}
          </Box>
          <Box
            sx={{
              backgroundColor: 'success.dark',
              padding: '5px',
              color: 'white',
            }}
          >
            {`${percentiles[2]}-${percentiles[3]}`}
          </Box>
          <Box
            sx={{
              backgroundColor: 'success.darker',
              padding: '5px',
              color: 'white',
            }}
          >
            {`≥${percentiles[3]}`}
          </Box>
        </Card>
      </Grid>
    </>
  );
}

export default ChoroplethMap;
