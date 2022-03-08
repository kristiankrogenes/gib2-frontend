import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

const initialState = {
  gasStations: [],
  status: 'idle',
  error: null,
};

export const fetchGasStations = createAsyncThunk(
  'gasStations/fetchGasStations',
  async () => {
    const response = await axiosInstance.get('/api/gasstations/');
    return response.data;
  }
);

export const gasStationsSlice = createSlice({
  name: 'gasStations',
  initialState,
  reducers: {
    addGasStation: (state, action) => {
      state.gasStations[0].features.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGasStations.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchGasStations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.gasStations = state.gasStations.concat(action.payload);
      })
      .addCase(fetchGasStations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { addGasStation } = gasStationsSlice.actions;

export default gasStationsSlice.reducer;

export const selectAllGasStations = (state) => state.gasStations.gasStations;
