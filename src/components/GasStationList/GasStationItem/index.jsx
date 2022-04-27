import React from 'react';
import { Stack, TableRow, TableCell, Typography } from '@mui/material';
import Label from '../../general/Label';
import { UserMoreMenu } from '../../_dashboard/user';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { fShortenNumber } from '../../../utils/formatNumber';

GasStationItem.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.array,
};

function GasStationItem({ row, selected }) {
  const { id, name } = row;
  const isItemSelected = selected.indexOf(name) !== -1;
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
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={'error'}>
          {fShortenNumber(latestPrice.octane95)}
        </Label>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={'info'}>
          {fShortenNumber(latestPrice.diesel)}
        </Label>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={'success'}>
          {fShortenNumber(latestPrice.electric)}
        </Label>
      </TableCell>
      <TableCell align="right">
        <UserMoreMenu />
      </TableCell>
    </TableRow>
  );
}

export default observer(GasStationItem);
