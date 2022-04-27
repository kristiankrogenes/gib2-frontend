import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Box,
  RadioGroup,
  Radio,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import {
  average,
  diesel,
  octane95,
  electric,
  county,
  municipality,
  total,
} from '../constants';

ControlPanel.propTypes = {
  fuel: PropTypes.string,
  compareValue: PropTypes.string,
  value: PropTypes.string,
  handleChangeCompare: PropTypes.func,
  handleChangeFuel: PropTypes.func,
  handleChangeType: PropTypes.func,
};

export default function ControlPanel(props) {
  const {
    fuel,
    compareValue,
    value,
    handleChangeCompare,
    handleChangeFuel,
    handleChangeType,
  } = props;
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        sx={{
          margin: '10px',
          width: '100px',
          height: '50px',
          backgroundColor: 'white',
        }}
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
      >
        Customize
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ margin: '10px' }}>
          <FormControl>
            <FormLabel id="id">Type</FormLabel>
            <RadioGroup
              aria-labelledby="id"
              value={value}
              onChange={handleChangeType}
            >
              <FormControlLabel
                value={county}
                control={<Radio />}
                label="County"
              />
              <FormControlLabel
                value={municipality}
                control={<Radio />}
                label="Municipality"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="id2">Attribute</FormLabel>
            <RadioGroup
              aria-labelledby="id2"
              value={compareValue}
              onChange={handleChangeCompare}
            >
              <FormControlLabel
                value={total}
                control={<Radio />}
                label="Number of gas stations"
              />
              <FormControlLabel
                value={average}
                control={<Radio />}
                label="Average price"
              />
            </RadioGroup>
          </FormControl>
          {compareValue === average ? (
            <FormControl>
              <FormLabel id="id3">Fuel</FormLabel>
              <RadioGroup
                aria-labelledby="id3"
                value={fuel}
                onChange={handleChangeFuel}
              >
                <FormControlLabel
                  value={octane95}
                  control={<Radio />}
                  label="Octane 95"
                />
                <FormControlLabel
                  value={diesel}
                  control={<Radio />}
                  label="Diesel"
                />
                <FormControlLabel
                  value={electric}
                  control={<Radio />}
                  label="Electric"
                />
              </RadioGroup>
            </FormControl>
          ) : null}
        </Box>
      </Popover>
    </div>
  );
}
