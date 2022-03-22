import React, { useEffect } from 'react';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import ScrollToTop from './components/general/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { useStore } from './stores/RootStore';

export default function App() {
  const { gasStationStore, priceStore, userStore } = useStore();
  useEffect(() => {
    async function fetchData() {
      await gasStationStore.fetchGasStations();
      priceStore.fetchPrices();
      userStore.fetchUsers();
    }
    fetchData();
  }, [gasStationStore, priceStore, userStore]);
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
