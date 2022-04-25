/* eslint-disable prettier/prettier */
import { Box, Card } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import { observer } from 'mobx-react-lite';
import React, { useRef, useState, useEffect } from 'react';
import Map, { GeolocateControl, Marker, Layer, Source } from 'react-map-gl';
import useGeoLocation from '../../hooks/useGeoLocation';
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
// import Cluster from '@urbica/react-map-gl-cluster';

function MapComponent() {
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
  const [marker, setMarker] = useState(null);
  const [optimizedRoutes, setOptimizedRoutes] = useState({});
  const [newStationInfo, setNewStationInfo] = useState({
    name: '',
    price: {
      diesel: '',
      octane95: '',
      electric: '',
    },
  });

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

  const geoLocation = useGeoLocation();

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
        const gasStationId = await addGasStation(marker, newStationInfo.name);
        await addPrice(newStationInfo.price, parseInt(gasStationId));
        setAddGas(!addGas);
        setMarker(null);
        setNewStationInfo({
          name: '',
          price: {
            diesel: '',
            octane95: '',
            electric: '',
          },
        });
      }
    }
  };

  const handleOptimizedRoute = async () => {
    const optimizedRoutes = await getOptimizedRoutes(geoLocation);
    setOptimizedRoutes(optimizedRoutes);
  };

  useEffect(() => {
    geoLocateRef.current?.trigger();
  }, [geoLocation])
  
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
            onGeolocate={handleGeoLocationChange}
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
          {selectedGasStation && <MapPopup />}
        </Map>
      </Box>
    </Card>
  );
}

export default observer(MapComponent);
