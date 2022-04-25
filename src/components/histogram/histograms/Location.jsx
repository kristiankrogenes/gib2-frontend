import React from 'react';
import { useState } from 'react';
import { merge } from 'lodash';
import Chart from 'react-apexcharts';
import { Card, CardHeader, Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------
Location.propTypes = {
  counties: PropTypes.object,
};

export default function Location({ counties }) {
  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: Object.keys(counties),
    },
  };

  const series = [
    {
      name: 'series-1',
      data: Object.keys(counties).map((key, index) => counties[key].total),
    },
  ];

  return (
    <Card>
      <CardHeader title="Histogram av plassering til bensinstasjoner" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart options={options} series={series} type="bar" width="100%" />
      </Box>
    </Card>
  );
}
