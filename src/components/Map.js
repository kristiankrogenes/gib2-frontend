import React from "react";
import Map, { Marker, Layer, Source } from "react-map-gl";
import { Box, Typography } from "@material-ui/core";
import { lerka, geojson } from "../utils/testData";
import useGeoLocation from "../hooks/useGeoLocation";

const layerStyle = {
  id: "polygon",
  type: "fill",
  paint: { "fill-color": "#007cbf", "fill-opacity": 0.5 },
};
const initialViewState = {
  longitude: lerka.longitude,
  latitude: lerka.latitude,
  zoom: 14,
  width: "100%",
  height: "100%",
};

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function MapComponent() {
  const currentLocation = useGeoLocation();
  return (
    <Box
      sx={{
        width: "100%",
        height: 500,
        border: "1px dashed grey",
      }}
    >
      <Typography>
        {currentLocation.loaded
          ? JSON.stringify(currentLocation)
          : "Location data not available yet"}
      </Typography>
      <Map
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
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
