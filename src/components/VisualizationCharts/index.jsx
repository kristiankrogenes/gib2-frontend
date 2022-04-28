import React from 'react';
import PricesHistogram from './Histograms/PricesHistogram';
import PricesDonut from './DonutCharts/PricesDonut';
import LocationHistogram from './Histograms/LocationHistogram';
import LocationDonut from './DonutCharts/LocationDonut';
import { Grid } from '@mui/material';
import axiosInstance from '../../utils/axios';
import { useState, useEffect } from 'react';
import { labels } from './constants';
import { logOut } from '../../stores/helpers';

export default function VisualizationCharts() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/insights/');
        setData(response.data);
      } catch (e) {
        console.log(e.message);
        logOut();
      }
    };
    fetchData();
  }, []);

  return (
    data && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <PricesHistogram
            labels={labels.octane_95}
            prices={Object.values(data.histogram.octane_95)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <PricesDonut
            labels={labels.octane_95}
            prices={Object.values(data.histogram.octane_95)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <PricesHistogram
            labels={labels.diesel}
            prices={Object.values(data.histogram.diesel)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <PricesDonut
            labels={labels.diesel}
            prices={Object.values(data.histogram.diesel)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <PricesHistogram
            labels={labels.electric}
            prices={Object.values(data.histogram.electric)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <PricesDonut
            labels={labels.electric}
            prices={Object.values(data.histogram.electric)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <LocationHistogram counties={data.county} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <LocationDonut counties={data.county} />
        </Grid>
      </Grid>
    )
  );
}
