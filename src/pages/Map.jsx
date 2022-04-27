import React from 'react';
import { Stack, Container, Typography } from '@mui/material';
import Page from '../components/general/Page';
import MapComponent from '../components/MapComponent';
import useGeoLocation from '../hooks/useGeoLocation';

export default function Map() {
  const geoLocation = useGeoLocation();
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
