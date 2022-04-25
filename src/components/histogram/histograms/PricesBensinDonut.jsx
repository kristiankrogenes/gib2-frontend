import React from 'react';
import Chart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
import { optionsDonut } from './constants';
import PropTypes from 'prop-types';

PricesBensinDonut.propTypes = {
  prices: PropTypes.array,
  labels: PropTypes.object,
};

export default function PricesBensinDonut({ prices }) {
  console.log(prices);
  return (
    <Card>
      <CardHeader title="Histogram over bensinpriser representert i donutdiagram" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart options={optionsDonut} series={prices} type="pie" width="80%" />
      </Box>
    </Card>
  );
}
