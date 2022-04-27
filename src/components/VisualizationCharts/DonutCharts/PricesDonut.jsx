import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { optionsDonut } from '../constants';
import PropTypes from 'prop-types';

PricesDonut.propTypes = {
  prices: PropTypes.array,
  labels: PropTypes.object,
};

export default function PricesDonut({ prices, labels }) {
  console.log(labels.donutTitle);
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title={labels.donutTitle} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart options={optionsDonut} series={prices} type="pie" width="80%" />
      </Box>
    </Card>
  );
}
