import React from 'react';
import { Stack, Avatar, TableRow, TableCell, Typography } from '@mui/material';
import Label from '../../general/Label';
import { UserMoreMenu } from '../../_dashboard/user';
import { mockImgAvatar } from '../../../utils/mockImages';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';

GasStationItem.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.array,
};

function GasStationItem({ row, selected }) {
  const { id, name } = row;
  const isItemSelected = selected.indexOf(name) !== -1;

  return (
    <TableRow
      hover
      key={id}
      tabIndex={-1}
      role="checkbox"
      selected={isItemSelected}
      aria-checked={isItemSelected}
    >
      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={mockImgAvatar(1)} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={'error'}>
          Lorem ipsum
        </Label>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={'info'}>
          Lorem ipsum
        </Label>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={'success'}>
          Lorem ipsum
        </Label>
      </TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={'warning'}>
          Lorem ipsum
        </Label>
      </TableCell>
      <TableCell align="right">
        <UserMoreMenu />
      </TableCell>
    </TableRow>
  );
}

export default observer(GasStationItem);
