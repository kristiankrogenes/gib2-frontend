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

export default function PricesDiesel() {
  const options = {
    xaxis: {
      categories: [
        '0 - 16',
        '17 - 18',
        '19 - 20',
        '21 - 22',
        '23 - 24',
        '25 - 26',
        '27 - 28',
      ],
    },
  };

  const series = [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 77],
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Histogram over dieselpriser"
        subheader="x-aksen teller antall forekomster av forskjellige dieselpriser i kr per liter"
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart options={options} series={series} type="bar" width="100%" />
      </Box>
    </Card>
  );
}
