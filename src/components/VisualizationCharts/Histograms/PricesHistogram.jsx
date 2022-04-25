import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { options } from '../constants';

PricesHistogram.propTypes = {
  prices: PropTypes.array,
  labels: PropTypes.object,
};

export default function PricesHistogram({ prices, labels }) {
  const series = [
    {
      name: 'Antall forekomster',
      data: prices,
    },
  ];

  return (
    <Card>
      <CardHeader title={labels.title} subheader={labels.subheader} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart options={options} series={series} type="bar" width="100%" />
      </Box>
    </Card>
  );
}
