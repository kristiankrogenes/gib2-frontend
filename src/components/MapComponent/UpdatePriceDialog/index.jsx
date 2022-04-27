import React from 'react';
import { useStore } from '../../../stores/RootStore';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { initialNewStationInfo } from '../constants';

UpdatePriceDialog.propTypes = {
  openUpdatePriceDialog: PropTypes.bool,
  setOpenUpdatePriceDialog: PropTypes.func,
  handleUpdatePrice: PropTypes.func,
  newStationInfo: PropTypes.object,
  setNewStationInfo: PropTypes.func,
};

export default function UpdatePriceDialog({
  openUpdatePriceDialog,
  setOpenUpdatePriceDialog,
  newStationInfo,
  setNewStationInfo,
}) {
  const {
    gasStationStore: { selectedGasStation },
    priceStore: { addPrice },
  } = useStore();

  const handleOnClick = async () => {
    await addPrice(newStationInfo.price, parseInt(selectedGasStation.id));
    setOpenUpdatePriceDialog(false);
    setNewStationInfo(initialNewStationInfo);
  };

  const handleClose = () => {
    setNewStationInfo(initialNewStationInfo);
    setOpenUpdatePriceDialog(false);
  };

  return (
    <Dialog open={openUpdatePriceDialog} onClose={handleClose}>
      <DialogTitle>Update Price</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'black', marginBottom: '10px' }}>
          Here you can add one or more prices.
        </DialogContentText>
        <TextField
          sx={{ marginBottom: '10px', marginRight: '10px' }}
          placeholder="Enter price"
          label="Diesel Price"
          onChange={(e) =>
            setNewStationInfo({
              ...newStationInfo,
              price: {
                diesel: e.target.value,
                octane95: newStationInfo.price.octane95,
                electric: newStationInfo.price.electric,
              },
            })
          }
        >
          Diesel Price
        </TextField>
        <TextField
          placeholder="Enter price"
          label="Octane95 Price"
          onChange={(e) =>
            setNewStationInfo({
              ...newStationInfo,
              price: {
                diesel: newStationInfo.price.diesel,
                octane95: e.target.value,
                electric: newStationInfo.price.electric,
              },
            })
          }
        >
          Octane95 Price
        </TextField>
        <TextField
          placeholder="Enter price"
          label="Electric Price"
          onChange={(e) =>
            setNewStationInfo({
              ...newStationInfo,
              price: {
                diesel: newStationInfo.price.diesel,
                octane95: newStationInfo.price.octane95,
                electric: e.target.value,
              },
            })
          }
        >
          Electric Price
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button sx={{ mr: 1 }} onClick={handleOnClick}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
