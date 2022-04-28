import React from 'react';
import { Stack, TableRow, TableCell, Link } from '@mui/material';
import Label from '../../../general/Label';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { fShortenNumber } from '../../../../utils/formatNumber';

GasStationItem.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.array,
  handleClickStation: PropTypes.func,
};

function GasStationItem({ row, selected, handleClickStation }) {
  const { id, name } = row;
  const isItemSelected = selected.indexOf(id) !== -1;
  const latestPrice = row.latestPrice ?? null;

  return (
    <TableRow
      hover
      key={id}
      tabIndex={-1}
      role="checkbox"
      selected={isItemSelected}
      aria-checked={isItemSelected}
    >
      <TableCell component="th" scope="row" padding="normal">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Link
            component="button"
            color="#000"
            underline="hover"
            variant="subtitle2"
            onClick={() => handleClickStation(row)}
          >
            {name}
          </Link>
        </Stack>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={'error'}>
          {fShortenNumber(latestPrice.octane95)}
        </Label>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={'error'}>
          {fShortenNumber(latestPrice.diesel)}
        </Label>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={'error'}>
          {fShortenNumber(latestPrice.electric)}
        </Label>
      </TableCell>
    </TableRow>
  );
}

export default observer(GasStationItem);
