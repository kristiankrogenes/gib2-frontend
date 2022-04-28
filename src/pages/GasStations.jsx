import React from 'react';
import { Stack, Container, Typography } from '@mui/material';
import Page from '../components/general/Page';
import { observer } from 'mobx-react-lite';
import GasStationList from '../components/GasStations/GasStationList';

function GasStations() {
  return (
    <Page title="Gas Stations | Minimal-UI">
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={0}
        >
          <Typography variant="h4" gutterBottom>
            Gas Stations
          </Typography>
        </Stack>
        <GasStationList />
      </Container>
    </Page>
  );
}

export default observer(GasStations);
