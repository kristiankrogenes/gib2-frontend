import { Box, Card } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import Map, { Layer, Source } from 'react-map-gl';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/RootStore';
import { point, featureCollection } from 'turf';
import { initialViewState, MAPBOX_TOKEN, mapStyle } from './constants';
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from './constants';
import PropTypes from 'prop-types';

ClusterMap.propTypes = {
  mapRef: PropTypes.object,
};

function ClusterMap({ mapRef }) {
  const {
    gasStationStore: { gasStations },
  } = useStore();

  // const data = useMemo(() => {
  //   return value === county
  //     ? counties &&
  //         updatePercentiles(counties, getValueFunction(compareValue, fuel))
  //     : munies &&
  //         updatePercentiles(munies, getValueFunction(compareValue, fuel));
  // }, [compareValue, counties, munies, value, fuel]);

  const onClick = (event) => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = mapRef.current.getSource('test');

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }
      mapRef.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      });
    });
  };
  return (
    <Card sx={{ width: '100%' }}>
      <Box sx={{ width: '100%', height: 600 }}>
        <Map
          initialViewState={initialViewState}
          mapStyle={mapStyle}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={[clusterLayer.id]}
          onClick={onClick}
          ref={mapRef}
        >
          <Source
            id="test"
            type="geojson"
            data={featureCollection(
              gasStations.map((e) => point(e.point, { id: e.id }))
            )}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
        </Map>
      </Box>
    </Card>
  );
}

export default observer(ClusterMap);
