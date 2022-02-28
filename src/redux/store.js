import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import currentPositionReducer from './features/currentPosition/currentPositionSlice';
import gasStationsReducer from './features/gasStations/gasStationsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    currentPosition: currentPositionReducer,
    gasStations: gasStationsReducer,
  },
});
