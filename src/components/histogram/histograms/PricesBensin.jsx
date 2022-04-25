import React from 'react';
import { merge } from 'lodash';
import Chart from 'react-apexcharts';
import { Card, CardHeader, Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { options } from './constants';

// ----------------------------------------------------------------------

PricesBensin.propTypes = {
  prices: PropTypes.array,
  labels: PropTypes.object,
};

export default function PricesBensin({ prices, labels }) {
  const series = [
    {
      name: 'series-1',
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
