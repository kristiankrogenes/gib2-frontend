import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { steps } from './constants';

MultiStep.propTypes = {
  activeStep: PropTypes.number,
  skipped: PropTypes.instanceOf(Set),
  isStepOptional: PropTypes.func,
  isStepSkipped: PropTypes.func,
};

export default function MultiStep(props) {
  const { activeStep, skipped, isStepOptional, isStepSkipped } = props;

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(skipped, index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
