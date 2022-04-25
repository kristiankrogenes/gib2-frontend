import React, { useEffect } from 'react';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import ScrollToTop from './components/general/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { useStore } from './stores/RootStore';

export default function App() {
  const {
    gasStationStore: { fetchGasStations },
    priceStore: { fetchPrices },
    userStore: { fetchUsers },
  } = useStore();
  useEffect(() => {
    async function fetchData() {
      await fetchGasStations();
      fetchPrices();
      fetchUsers();
    }
    fetchData();
  }, [fetchGasStations, fetchPrices, fetchUsers]);
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
