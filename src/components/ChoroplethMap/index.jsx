import { Box, Card } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useMemo, useState } from 'react';
import Map, { Layer, Source } from 'react-map-gl';
import { updatePercentiles } from '../../utils/updatePercentiles';
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

function ChoroplethMap() {
  const [munies, setMunies] = useState(null);
  const [counties, setCounties] = useState(null);
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
      <Box
        sx={{ width: '100%', height: parseFloat(window.innerHeight) * 0.75 }}
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
  );
}

export default ChoroplethMap;
