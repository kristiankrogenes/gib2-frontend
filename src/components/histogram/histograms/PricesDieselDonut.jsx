import React from 'react';
import Chart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';

export default function PricesBensinDonut() {
  const series = [30, 40, 45, 50, 49, 60, 77];

  return (
    <Card>
      <CardHeader title="Histogram over dieselpriser representert i donutdiagram" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {/* <Chart options={options} series={series} type="donut" width="80%" /> */}
      </Box>
    </Card>
  );
}
