import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { optionsLocation } from '../constants';

LocationDonut.propTypes = {
  counties: PropTypes.object,
};

export default function LocationDonut({ counties }) {
  const data = Object.keys(counties).map((key, index) => counties[key].total);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Histogram over bensinpriser representert i donutdiagram" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Chart options={optionsLocation} series={data} type="pie" width="80%" />
      </Box>
    </Card>
  );
}
