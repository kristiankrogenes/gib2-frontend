import React from 'react';
import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
import logo from '../../../static/img/gFuel_logo.jpg';
// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return <Box component="img" src={logo} sx={{ width: 200, ...sx }} />;
}
