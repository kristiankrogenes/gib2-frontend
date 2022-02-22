import React, { useState } from 'react';
import { Box, Card } from '@mui/material';
import axiosInstance from '../../utils/axios';
import Map, { Popup, Marker, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector, useDispatch } from 'react-redux';
import MapToolbar from './MapToolbar';
import MapPin from './MapPin';
import {
  addGasStation,
  selectAllGasStations,
} from '../../redux/features/gasStations/gasStationsSlice';

import { initialViewState, mapStyle } from './constants';
import { getGasStationPOST } from './helpers';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function MapComponent() {
  const [addGas, setAddGas] = useState(false);

  const [popupInfo, setPopupInfo] = useState(null);
  const [marker, setMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const gasStations = useSelector(selectAllGasStations); // Redux store value

  const handleGeoLocationChange = (e) => {
    console.log(e.coords);
    setCurrentLocation(e.coords);
  };

  const dispatch = useDispatch();

  const handleAddStation = async () => {
    console.log(gasStations);
    if (!addGas) {
      setAddGas(!addGas);
    } else {
      if (marker) {
        const name = 'Kristian';
        const price = 21.2;
        const data = getGasStationPOST(marker, name, price);
        const result = await axiosInstance.post('gasstations/', data); // Inserting a new gas station to the database table

        setAddGas(!addGas);
        setMarker(null);
        dispatch(addGasStation(result.data));
      }
    }
  };

  const onMapClick = (e) => {
    console.log(e.lngLat);
    const marker = {
      marker: (
        <Marker
          longitude={e.lngLat.lng}
          latitude={e.lngLat.lat}
          anchor="bottom"
          draggable={true}
        >
          <MapPin onClick={() => null} />
        </Marker>
      ),
      coordinates: e.lngLat,
    };
    setMarker(marker);
  };

  return (
    <Card>
      <MapToolbar handleAddStation={handleAddStation} filterName="" />
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
          onClick={addGas ? onMapClick : null}
        >
          <GeolocateControl
            position="top-left"
            trackUserLocation={true}
            showUserLocation={true}
            onGeolocate={handleGeoLocationChange}
          />
          {gasStations.length > 0 &&
            gasStations[0].features.map((station, index) => (
              <Marker
                key={`marker-${index}`}
                longitude={station.geometry.coordinates[0]}
                latitude={station.geometry.coordinates[1]}
                anchor="bottom"
              >
                <MapPin onClick={() => setPopupInfo(station)} />
              </Marker>
            ))}
          {marker ? marker.marker : ''}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={popupInfo.geometry.coordinates[0]}
              latitude={popupInfo.geometry.coordinates[1]}
              closeOnClick={false}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                {popupInfo.geometry.coordinates[0]},{' '}
                {popupInfo.geometry.coordinates[1]}, {'navn:'}{' '}
                {popupInfo.properties.name}
              </div>
            </Popup>
          )}
        </Map>
      </Box>
    </Card>
  );
}

export default MapComponent;
