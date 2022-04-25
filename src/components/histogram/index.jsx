import React from 'react';
import PricesBensin from './histograms/PricesBensin';
import PricesBensinDonut from './histograms/PricesBensinDonut';
import PricesDieselDonut from './histograms/PricesDieselDonut';
import PricesDiesel from './histograms/PricesDiesel';
import Location from './histograms/Location';
import LocationDonut from './histograms/LocationDonut';
import { Box, Grid, Container, Typography } from '@mui/material';
import axiosInstance from '../../utils/axios';
import { useState, useEffect } from 'react';

const labels = {
  diesel: {
    title: 'Histogram over dieselpriser',
    subheader:
      'x-aksen teller antall forekomster av forskjellige dieselpriser i kr per liter',
  },
  octane_95: {
    title: 'Histogram over bensinpriser',
    subheader:
      'x-aksen teller antall forekomster av forskjellige bensinpriser i kr per liter',
  },
  electric: {
    title: 'Histogram over elektriske priser',
    subheader:
      'x-aksen teller antall forekomster av forskjellige elektriske priser i kWh',
  },
};

export default function Histogram() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get('/api/insights/');
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    data && (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7} md={7}>
          <PricesBensin
            labels={labels.octane_95}
            prices={Object.values(data.histogram.octane_95)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
          <PricesBensinDonut prices={Object.values(data.histogram.octane_95)} />
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <PricesBensin
            labels={labels.diesel}
            prices={Object.values(data.histogram.diesel)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
          <PricesBensinDonut prices={Object.values(data.histogram.diesel)} />
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <PricesBensin
            labels={labels.electric}
            prices={Object.values(data.histogram.electric)}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
          <PricesBensinDonut prices={Object.values(data.histogram.electric)} />
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <Location counties={data.county} />
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
          <LocationDonut counties={data.county} />
        </Grid>
      </Grid>
    )
  );
}
