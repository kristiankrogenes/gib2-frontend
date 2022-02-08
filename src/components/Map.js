import React from 'react';
import Map, { Marker, Layer, Source } from 'react-map-gl';
import { Box } from '@material-ui/core';
import { lerka, geojson } from '../utils/testData';

console.log(     "test"      )
;

const layerStyle = {
    id: "polygon", type: 'fill', paint: {'fill-color': '#007cbf',
        'fill-opacity': 0.5,},
};
const initialViewState = {
    longitude: lerka.longitude,
    latitude: lerka.latitude,
    zoom: 14,
    width: '100%',
    height: '100%',
};

function MapComponent() {
    return (
        <Box
            sx={{
                width: '100%',
                height: 500,
                border: '1px dashed grey',
            }}
        >
            <Map
                initialViewState={initialViewState}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            >
                <Source id="my-data" type="geojson" data={geojson}>
                    <Layer {...layerStyle} />
                </Source>
                <Marker
                    longitude={lerka.longitude}
                    latitude={lerka.latitude}
                    color="red"
                />
            </Map>
        </Box>
    );
}

export default MapComponent;
