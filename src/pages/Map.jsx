import React, { useEffect } from 'react';
import { Stack, Container, Typography } from '@mui/material';
import Page from '../components/general/Page';
import MapComponent from '../components/MapComponent';
import { useStore } from '../stores/RootStore';
import useGeoLocation from '../hooks/useGeoLocation';

export default function Map() {
  const geoLocation = useGeoLocation();
  const {
    gasStationStore: { fetchGasStations },
    priceStore: { fetchPrices },
  } = useStore();
  useEffect(() => {
    async function fetchData() {
      await fetchGasStations(geoLocation.coordinates);
      fetchPrices();
    }
    if (geoLocation.loaded) fetchData();
  }, [fetchGasStations, fetchPrices, geoLocation]);
  return (
    <Page title="Map | GIB2">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography variant="h4" gutterBottom>
            Map
          </Typography>
        </Stack>
        <MapComponent geoLocation={geoLocation} />
      </Container>
    </Page>
  );
}
