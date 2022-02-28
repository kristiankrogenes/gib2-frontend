import React, { useState } from 'react';
import { Box, Card } from '@mui/material';
import axiosInstance from '../../utils/axios';
import Map, { GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector, useDispatch } from 'react-redux';
import MapToolbar from './MapToolbar';
import {
  addGasStation,
  selectAllGasStations,
} from '../../redux/features/gasStations/gasStationsSlice';

import { initialViewState, mapStyle, MAPBOX_TOKEN } from './constants';
import { getGasStationPOST, makeMarkerFromMapClick } from './helpers';
import AddStationDialog from './AddStationDialog';
import MapPopup from './MapPopup';
import MapMarker from './MapMarker';

function MapComponent() {
  const [addGas, setAddGas] = useState(false);
  const [open, setOpen] = useState(false);
  const [newStationInfo, setNewStationInfo] = useState({
    name: '',
    price: '',
  });

  const [popupInfo, setPopupInfo] = useState(null);
  const [marker, setMarker] = useState(null);
  //   const [currentLocation, setCurrentLocation] = useState(null);

  const gasStations = useSelector(selectAllGasStations); // Redux store value

  const handleGeoLocationChange = (e) => {
    console.log(e.coords);
    // setCurrentLocation(e.coords);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  const handleAddStation = async () => {
    if (!addGas) {
      setAddGas(!addGas);
    } else {
      if (marker) {
        const data = getGasStationPOST(
          marker,
          newStationInfo.name,
          newStationInfo.price
        );
        const result = await axiosInstance.post('gasstations/', data); // Inserting a new gas station to the database table
        setAddGas(!addGas);
        setMarker(null);
        dispatch(addGasStation(result.data));
      }
    }
  };

  const onMapClick = (e) => {
    if (addGas) {
      const marker = makeMarkerFromMapClick(e);
      setMarker(marker);
    }
  };

  return (
    <Card>
      <MapToolbar
        handleAddStation={handleAddStation}
                handleClickOpen={handleClickOpen}
        
        
                            filterName=""
        
                            
                    addGas={addGas}
      />
      <AddStationDialog
        open={open}
        setOpen={setOpen}
        handleAddStation={handleAddStation}
        newStationInfo={newStationInfo}
        setNewStationInfo={setNewStationInfo}
      />
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
          onClick={onMapClick}
        >
          <GeolocateControl
            position="top-left"
            trackUserLocation={true}
            showUserLocation={true}
            onGeolocate={handleGeoLocationChange}
          />
          {gasStations.length > 0 &&
            gasStations[0].features.map((station, index) => (
              <MapMarker
                key={`marker-${index}`}
                station={station}
                setPopupInfo={setPopupInfo}
              />
            ))}
          {marker ? marker.marker : ''}
          {popupInfo && (
            <MapPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
          )}
        </Map>
      </Box>
    </Card>
  );
}

export default MapComponent;
