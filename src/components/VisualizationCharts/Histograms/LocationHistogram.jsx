import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import PropTypes from 'prop-types';

LocationHistogram.propTypes = {
  counties: PropTypes.object,
};

export default function LocationHistogram({ counties }) {
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
      name: 'Antall bensinstasjoner',
      data: Object.keys(counties).map((key, index) => counties[key].total),
    },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Histogram of locations of gas stations" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart options={options} series={series} type="bar" width="100%" />
      </Box>
    </Card>
  );
}
