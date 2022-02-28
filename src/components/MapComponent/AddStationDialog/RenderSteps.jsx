import React from 'react';
import PropTypes from 'prop-types';
import StationName from './StationName';
import StationPrice from './StationPrice';
import ConfirmInfo from './ConfirmInfo';

RenderSteps.propTypes = {
  activeStep: PropTypes.number,
  newStationInfo: PropTypes.object,
  setNewStationInfo: PropTypes.func,
};

function RenderSteps({ activeStep, newStationInfo, setNewStationInfo }) {
  switch (activeStep) {
    case 0:
      return (
        <StationName
          newStationInfo={newStationInfo}
          setNewStationInfo={setNewStationInfo}
        />
      );
    case 1:
      return (
        <StationPrice
          newStationInfo={newStationInfo}
          setNewStationInfo={setNewStationInfo}
        />
      );
    case 2:
      return <ConfirmInfo newStationInfo={newStationInfo} />;
    default:
      return null;
  }
}

export default RenderSteps;
