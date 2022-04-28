import React, { useEffect } from 'react';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import ScrollToTop from './components/general/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { useStore } from './stores/RootStore';
import useGeoLocation from './hooks/useGeoLocation';

export default function App() {
  const geoLocation = useGeoLocation();
  const {
    userStore: { fetchUsers },
    gasStationStore: { fetchGasStations },
    priceStore: { fetchPrices },
  } = useStore();
  useEffect(() => {
    async function fetchData() {
      await fetchGasStations(geoLocation.coordinates);
      fetchPrices();
      fetchUsers();
    }
    if (geoLocation.loaded && localStorage.getItem('access_token')) fetchData();
  }, [fetchGasStations, fetchPrices, fetchUsers, geoLocation]);
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
