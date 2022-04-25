import React, { useEffect } from 'react';
import { Stack, Container, Typography } from '@mui/material';
// components
import Page from '../components/general/Page';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/RootStore';
import GasStationList from '../components/GasStationList';

function GasStations() {
  const { gasStationStore } = useStore();

  useEffect(() => {
    async function fetchData() {
      await gasStationStore.fetchGasStations();
    }
    fetchData();
  }, [gasStationStore]);

  return (
    <Page title="Gas Stations | Minimal-UI">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
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
