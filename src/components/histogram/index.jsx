import React from 'react';
import PricesBensin from './histograms/PricesBensin';
import PricesBensinDonut from './histograms/PricesBensinDonut';
import PricesDieselDonut from './histograms/PricesDieselDonut';
import PricesDiesel from './histograms/PricesDiesel';
import Location from './histograms/Location';
import { Box, Grid, Container, Typography } from '@mui/material';

export default function Histogram() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={7} md={7}>
        <PricesBensin />
      </Grid>
      <Grid item xs={12} sm={5} md={5}>
        <PricesBensinDonut />
      </Grid>
      <Grid item xs={12} sm={7} md={7}>
        <PricesDiesel />
      </Grid>
      <Grid item xs={12} sm={5} md={5}>
        <PricesDieselDonut />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Location />
      </Grid>
    </Grid>
  );
}
