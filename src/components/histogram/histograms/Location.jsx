import React from 'react';
import { useState } from 'react';
import { merge } from 'lodash';
import Chart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, Stack } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { ProductSort } from '../../_dashboard/products';

// ----------------------------------------------------------------------

export default function Histogram() {
  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: [
        'Oslo',
        'Rogaland',
        'Møre og Romsdal',
        'Nordland',
        'Viken',
        'Innlandet',
        'Vestfold og Telemark',
        'Agder',
        'Vestland',
        'Trøndelag',
        'Troms og Finnmark',
      ],
    },
  };

  const series = [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 44, 51, 77],
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
