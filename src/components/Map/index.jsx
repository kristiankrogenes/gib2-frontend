import React from "react";
import Map, { Marker, Layer, Source } from "react-map-gl";
import { Box, Button, Typography } from "@mui/material";
import useGeoLocation from "../../hooks/useGeoLocation";
import { initialViewState, layerStyle, lerka, geojson } from "./constants";
import axiosInstance from "../../utils/axios";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function MapComponent() {
  const currentLocation = useGeoLocation();

  const handleButtonClick = async () => {
    const data = {
      name: "PostRequest Test2",
      geom: `SRID=4326;POINT (${currentLocation.coordinates.lng} ${currentLocation.coordinates.lat})`,
    };
    const result = await axiosInstance.post("developers/", data);
    console.log(result);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 500,
        border: "1px dashed grey",
      }}
    >
      <Button variant="contained" onClick={handleButtonClick}>
        test
      </Button>
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
