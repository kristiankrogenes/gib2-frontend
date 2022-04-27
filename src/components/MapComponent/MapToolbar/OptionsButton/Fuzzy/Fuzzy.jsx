import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { Button } from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PropTypes from 'prop-types';

Fuzzy.propTypes = {
  handleOptimizedRouteFuzzy: PropTypes.func,
};

export default function Fuzzy({ handleOptimizedRouteFuzzy }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = useState(50);
  const [fuel, setFuel] = useState('Diesel');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light'
          ? 'rgb(55, 65, 81)'
          : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeFuel = (event) => {
    setFuel(event.target.value);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ width: '100%' }}
      >
        Optimized route with fuzzy logic
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ width: '240px', height: '400px' }}>
          <Box sx={{ padding: '5px' }}>
            Choose your prioritizinging. If you slide it more towards fuel price
            we will weight the fuel price more than nearest gas station and vice
            versa.
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              Fuel price
              <Slider
                aria-label="Volume"
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"
              />
              Duration
            </Stack>
          </Box>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Choose your fuel type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="diesel"
              name="radio-buttons-group"
              onChange={handleChangeFuel}
            >
              <FormControlLabel
                value="diesel"
                control={<Radio />}
                label="Diesel"
              />
              <FormControlLabel
                value="octane_95"
                control={<Radio />}
                label="Octane 95"
              />
              <FormControlLabel
                value="electric"
                control={<Radio />}
                label="Electric"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Button
          onClick={() => {
            var weigth = (100 - value) / 100;
            handleOptimizedRouteFuzzy(fuel.toLowerCase(), weigth);
          }}
        >
          Confirm
        </Button>
      </StyledMenu>
    </div>
  );
}
