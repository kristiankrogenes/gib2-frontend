import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import carOutline from '@iconify/icons-eva/car-outline';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Box, Button, InputAdornment } from '@mui/material';
import { RootStyle, SearchStyle } from './styles';

MapToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  handleAddStation: PropTypes.func,
  handleClickOpen: PropTypes.func,
  addGas: PropTypes.bool,
};

export default function MapToolbar(props) {
  const {
    filterName,
    onFilterName,
    handleAddStation,
    handleClickOpen,
    addGas,
  } = props;

  const onClick = () => {
    if (!addGas) handleClickOpen();
    else handleAddStation();
  };
  return (
    <RootStyle>
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder="Search for gas station..."
        startAdornment={
          <InputAdornment position="start">
            <Box
              component={Icon}
              icon={carOutline}
              sx={{ color: 'text.disabled' }}
            />
          </InputAdornment>
        }
      />
      <Button
        variant="contained"
        startIcon={<Icon icon={plusFill} />}
        onClick={handleAddStation}
      >
        Add Price
      </Button>
      <Button
        variant="contained"
        onClick={onClick}
        startIcon={<Icon icon={plusFill} />}
      >
        {addGas ? 'Confirm position' : 'Add station'}
      </Button>
    </RootStyle>
  );
}
