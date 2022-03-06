import React, { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import axiosInstance from '../../utils/axios';
import Map, { GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapToolbar from './MapToolbar';
import { initialViewState, mapStyle, MAPBOX_TOKEN } from './constants';
import {
  getGasStationPOST,
  makeMarkerFromMapClick,
  getGasStationFromAPI,
} from './helpers';
import AddStationDialog from './AddStationDialog';
import MapPopup from './MapPopup';
import MapMarker from './MapMarker';
import { observer } from 'mobx-react-lite';
import { useGasStations } from '../../stores/GasStationStore';

function MapComponent() {
  const [addGas, setAddGas] = useState(false);
  const [open, setOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [marker, setMarker] = useState(null);
  const [newStationInfo, setNewStationInfo] = useState({
    name: '',
    price: '',
  });
  const gasStationStore = useGasStations();

  useEffect(() => {
    gasStationStore.fetchGasStations();
    console.log(gasStationStore.gasStations.length);
  }, [gasStationStore]);

  const handleGeoLocationChange = (e) => {
    console.log(e.coords);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

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
        const response = await axiosInstance.post('gasstations/', data); // Inserting a new gas station to the database table
        gasStationStore.addGasStation(getGasStationFromAPI(response.data));
        setAddGas(!addGas);
        setMarker(null);
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
          {gasStationStore.gasStations.length > 0 &&
            gasStationStore.gasStations.map((station, index) => (
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

export default observer(MapComponent);
