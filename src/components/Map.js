import React from 'react';
import Map, { Marker } from 'react-map-gl';
import { Box } from '@material-ui/core';

 
// const MAPBOX_TOKEN="pk.eyJ1Ijoic2lndXJkYmFra2VydWQiLCJhIjoiY2t6Y2ZpYjJtMGhxcDJ4cDh6NTdobXp0dyJ9.gxwAMoaOj91JvNVzVwl6Hg";

function MapComponent() {

    // coordinates for lerkendalsbygget
    const lerka = {longitude: 10.406852960586548, latitude: 63.4147798358434}

    const initialViewState = {
            longitude: lerka.longitude,
            latitude: lerka.latitude,
            zoom: 14,
            width: "100%",
            height: "100%"
        };

    return (
        <Box sx={{
            width: '50%',
            height: 500,
            border: '1px dashed grey',
            margin: 'auto',
            display: 'block',
        }}>
            {/* <Map
                initialViewState={initialViewState}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
            <Marker longitude={lerka.longitude} latitude={lerka.latitude} color="red" />
            </Map> */}
        </Box>
    )
}

export default MapComponent;