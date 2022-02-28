import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from '../components/general/Page';
import MapComponent from '../components/MapComponent';
import { fetchGasStations } from '../redux/features/gasStations/gasStationsSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Map() {
  const dispatch = useDispatch();
  //   const gasStations = useSelector(selectAllGasStations);

  const gasStationStatus = useSelector((state) => state.gasStations.status);

  useEffect(() => {
    if (gasStationStatus === 'idle') {
      dispatch(fetchGasStations());
    }
  }, [gasStationStatus, dispatch]);

  return (
    <Page title="Map | GIB2">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Map
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New User
          </Button>
        </Stack>
        <MapComponent />
      </Container>
    </Page>
  );
}
