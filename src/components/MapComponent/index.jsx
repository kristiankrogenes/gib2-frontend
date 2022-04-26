/* eslint-disable prettier/prettier */
import { Box, Card } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import { observer } from 'mobx-react-lite';
import React, { useRef, useState, useEffect } from 'react';
import Map, { GeolocateControl, Marker, Layer, Source } from 'react-map-gl';
// import MapGL, {
//   GeolocateControl,
//   Layer,
//   Source,
//   Marker,
// } from '@urbica/react-map-gl';
import { useStore } from '../../stores/RootStore';
import AddStationDialog from './AddStationDialog';
import {
  initialViewState,
  MAPBOX_TOKEN,
  mapStyle,
  lineLayerStyle,
  initialNewStationInfo
} from './constants';
import {
  makeMarkerFromMapClick,
  getOptimizedRoutes,
  // ClusterMarker,
} from './helpers';
// import MapMarker from './MapMarker';
import MapPin from './MapPin';
import MapPopup from './MapPopup';
import MapToolbar from './MapToolbar';
import UpdatePriceDialog from './UpdatePriceDialog';
import PropTypes from 'prop-types';
import { isNotValidPrice } from './AddStationDialog/helpers';
// import Cluster from '@urbica/react-map-gl-cluster';

MapComponent.propTypes = {
  geoLocation: PropTypes.object,
};

function MapComponent({ geoLocation }) {
  // const [viewport, setViewport] = useState({
  //   latitude: lerka.lat,
  //   longitude: lerka.lng,
  //   width: '100vw',
  //   height: '100vh',
  //   zoom: 12,
  // });
  const mapRef = useRef(null);
  const geoLocateRef = useRef(null);
  const [addGas, setAddGas] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdatePriceDialog, setOpenUpdatePriceDialog] = useState(false);
  const [marker, setMarker] = useState(null);
  const [optimizedRoutes, setOptimizedRoutes] = useState({});
  const [newStationInfo, setNewStationInfo] = useState(initialNewStationInfo);

  const {
    gasStationStore: {
      gasStationsInsideRadius,
      getGasStationsInsideRadius,
      addGasStation,
      setSelectedGasStation,
      selectedGasStation,
    },
    priceStore: { addPrice },
  } = useStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddStation = async () => {
    if (!addGas) {
      setAddGas(!addGas);
    } else {
      if (marker) {
        const gasStationId = await addGasStation(marker, newStationInfo.name);
        if (!isNotValidPrice(newStationInfo.price)) {
          await addPrice(newStationInfo.price, parseInt(gasStationId));
        }
        setAddGas(!addGas);
        setMarker(null);
        setNewStationInfo(initialNewStationInfo);
      }
    }
  };

  const handleClickOpenUpdatePrice = () => {
    setOpenUpdatePriceDialog(true);
    setNewStationInfo({
      name: selectedGasStation.name,
      price: {
        diesel: selectedGasStation.latestPrice
          ? selectedGasStation.latestPrice.diesel
          : null,
        octane95: selectedGasStation.latestPrice
          ? selectedGasStation.latestPrice.octane95
          : null,
        electric: selectedGasStation.latestPrice
          ? selectedGasStation.latestPrice.electric
          : null,
      },
    });
  };

  const handleOptimizedRoute = async () => {
    const optimizedRoutes = await getOptimizedRoutes(geoLocation);
    setOptimizedRoutes(optimizedRoutes);
  };

  useEffect(() => {
    geoLocateRef.current?.trigger();
  }, [geoLocation]);

  const onMapClick = (e) => {
    if (addGas) {
      const marker = makeMarkerFromMapClick(e);
      setMarker(marker);
    }
  };

  const handleMapPinClick = (station) => {
    setSelectedGasStation(station);
  };

  const onFilterName = (newValue) => {
    if (newValue) {
      mapRef.current.flyTo({
        center: newValue.point,
        essential: true,
      });
      handleMapPinClick(newValue);
    }
  };

  return (
    <Card>
      <MapToolbar
        handleOptimizedRoute={handleOptimizedRoute}
        handleAddStation={handleAddStation}
        handleClickOpen={handleClickOpen}
        onFilterName={onFilterName}
        addGas={addGas}
      />
      <AddStationDialog
        open={open}
        setOpen={setOpen}
        handleAddStation={handleAddStation}
        newStationInfo={newStationInfo}
        setNewStationInfo={setNewStationInfo}
      />
      <UpdatePriceDialog
        openUpdatePriceDialog={openUpdatePriceDialog}
        setOpenUpdatePriceDialog={setOpenUpdatePriceDialog}
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
          ref={mapRef}
          // onViewportChange={(newViewport) => {
          //   setViewport({ ...newViewport });
          // }}
          // style={{ width: '100%', height: 600 }}
          mapStyle={mapStyle}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          // accessToken={MAPBOX_TOKEN}
          onClick={onMapClick}
        >
          <GeolocateControl
            ref={geoLocateRef}
            position="top-left"
            trackUserLocation={true}
            showUserLocation={true}
          />

          {Object.keys(optimizedRoutes).length === 0 ? (
            <></>
          ) : (
            <Source id="optimized-routes" type="geojson" data={optimizedRoutes}>
              <Layer {...lineLayerStyle} />
            </Source>
          )}

          {
            gasStationsInsideRadius.length > 0 &&
              // <Cluster
              //   radius={80}
              //   extent={512}
              //   nodeSize={64}
              //   component={ClusterMarker}
              // >
              getGasStationsInsideRadius().map((station) => (
                <Marker
                  key={station.id}
                  longitude={station.point[0]}
                  latitude={station.point[1]}
                  anchor="bottom"
                >
                  <MapPin onClick={() => handleMapPinClick(station)} />
                </Marker>
              ))
            // </Cluster>
          }
          {marker?.marker}
          {selectedGasStation && (
            <MapPopup handleClickOpenUpdatePrice={handleClickOpenUpdatePrice} />
          )}
        </Map>
      </Box>
    </Card>
  );
}

export default observer(MapComponent);
