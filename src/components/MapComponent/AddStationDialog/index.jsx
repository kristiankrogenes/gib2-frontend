import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import MultiStep from './MultiStep';
import { isStepSkipped, isStepOptional } from './helpers';
import RenderSteps from './RenderSteps';

AddStationDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleAddStation: PropTypes.func,
  newStationInfo: PropTypes.object,
  setNewStationInfo: PropTypes.func,
};

export default function AddStationDialog(props) {
  const { open, setOpen, handleAddStation, newStationInfo, setNewStationInfo } =
    props;
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const handleClose = () => {
    setOpen(false);
    handleAddStation();
    setActiveStep(0);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(skipped, activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="dialog-title">
          <MultiStep
            activeStep={activeStep}
            skipped={skipped}
            isStepOptional={isStepOptional}
            isStepSkipped={isStepSkipped}
          />
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%' }}>
            <RenderSteps
              activeStep={activeStep}
              newStationInfo={newStationInfo}
              setNewStationInfo={setNewStationInfo}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <div style={{ flex: '1 0 0' }} />
          <Box sx={{ flex: '1 1 auto' }} />
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}
          {activeStep === 2 ? (
            <Button onClick={handleClose}>Finish</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
