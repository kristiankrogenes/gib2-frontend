import React, { useEffect } from 'react';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import ScrollToTop from './components/general/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { useStore } from './stores/RootStore';

export default function App() {
  const {
    userStore: { fetchUsers },
  } = useStore();
  useEffect(() => {
    async function fetchData() {
      fetchUsers();
    }
    fetchData();
  }, [fetchUsers]);
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
