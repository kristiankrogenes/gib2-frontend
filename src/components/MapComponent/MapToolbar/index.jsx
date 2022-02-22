import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import carOutline from '@iconify/icons-eva/car-outline';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
import plusFill from '@iconify/icons-eva/plus-fill';
import {
  Box,
  Tooltip,
  IconButton,
  Button,
  InputAdornment,
} from '@mui/material';
import { RootStyle, SearchStyle } from './styles';

MapToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  handleAddStation: PropTypes.func,
};

export default function MapToolbar(props) {
  return (
    <RootStyle>
      <SearchStyle
        value={props.filterName}
        onChange={props.onFilterName}
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
        onClick={props.handleAddStation}
      >
        Add station
      </Button>
      <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
        Add station
      </Button>
      <Tooltip title="Filter list">
        <IconButton>
          <Icon icon={roundFilterList} />
        </IconButton>
      </Tooltip>
    </RootStyle>
  );
}
