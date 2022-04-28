import React, { useState, useRef } from 'react';
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Scrollbar from '../../general/Scrollbar';
import SearchNotFound from '../../general/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../_dashboard/user';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/RootStore';
import GasStationItem from './GasStationItem';
import ClusterMap from '../ClusterMap';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'octane95', label: 'Octane95 price', alignRight: false },
  { id: 'diesel', label: 'Diesel price', alignRight: false },
  { id: 'electric', label: 'Electric price', alignRight: false },
];

function GasStationList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const mapRef = useRef(null);

  const {
    gasStationStore: { gasStations },
  } = useStore();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = gasStations.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleClickStation = (station) => {
    setSelected([station.id]);
    mapRef.current.flyTo({
      center: station.point,
      zoom: 14,
      essential: true,
    });
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - gasStations.length) : 0;

  const isStationNotFound = gasStations.length === 0;

  return (
    <>
      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={gasStations.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {gasStations
                  .filter((row) => row.name.includes(filterName))
                  .sort((a, b) => {
                    if (orderBy === 'name') {
                      const compare = a[orderBy]
                        .toLowerCase()
                        .localeCompare(b[orderBy].toLowerCase());
                      return (order === 'asc' ? 1 : -1) * compare;
                    } else {
                      if (!a || !b) return !a ? -1 : 1;
                      const compare =
                        a.latestPrice[orderBy] - b.latestPrice[orderBy];
                      return (order === 'asc' ? 1 : -1) * compare;
                    }
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <GasStationItem
                      key={row.id}
                      row={row}
                      selected={selected}
                      handleClickStation={handleClickStation}
                    />
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {isStationNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={gasStations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <ClusterMap mapRef={mapRef} />
    </>
  );
}

export default observer(GasStationList);
