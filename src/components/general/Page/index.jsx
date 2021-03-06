import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import React, { forwardRef } from 'react';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const Page = forwardRef(({ children, title = '', ...other }, ref) => (
  <Box sx={{ paddingTop: '0px', margin: '0px' }} ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
