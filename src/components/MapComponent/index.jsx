import { Box, Card } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Map, { GeolocateControl } from 'react-map-gl';
import { useStore } from '../../stores/RootStore';
import AddStationDialog from './AddStationDialog';
import { initialViewState, MAPBOX_TOKEN, mapStyle } from './constants';
import { makeMarkerFromMapClick } from './helpers';
// import MapMarker from './MapMarker';
import MapPin from './MapPin';
import { Marker } from 'react-map-gl';
import MapPopup from './MapPopup';
import MapToolbar from './MapToolbar';

function MapComponent() {
  const [addGas, setAddGas] = useState(false);
  const [open, setOpen] = useState(false);
  const [marker, setMarker] = useState(null);
  const [newStationInfo, setNewStationInfo] = useState({
    name: '',
    price: {
      diesel: '',
      unleaded: '',
      electric: '',
    },
  });

  const { gasStationStore, priceStore } = useStore();

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
        const gasStationId = await gasStationStore.addGasStation(
          marker,
          newStationInfo.name
        );
        await priceStore.addPrice(newStationInfo.price, parseInt(gasStationId));
        setAddGas(!addGas);
        setMarker(null);
        setNewStationInfo({
          name: '',
          price: {
            diesel: '',
            unleaded: '',
            electric: '',
          },
        });
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
            gasStationStore.gasStations.map((station) => (
              <Marker
                key={station.id}
                longitude={station.point[0]}
                latitude={station.point[1]}
                anchor="bottom"
              >
                <MapPin
                  onClick={() => gasStationStore.setSelectedGasStation(station)}
                />
              </Marker>
            ))}
          {marker?.marker}
          {gasStationStore.selectedGasStation && <MapPopup />}
        </Map>
      </Box>
    </Card>
  );
}

export default observer(MapComponent);
