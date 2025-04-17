import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RouteData, fetchRoute } from '../../services/api';

interface RouteState {
  routeData: RouteData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RouteState = {
  routeData: null,
  status: 'idle',
  error: null,
};

// Async thunk for fetching route data
export const fetchRouteData = createAsyncThunk(
  'route/fetchRouteData',
  async ({ origin, destination }: { origin: string; destination: string }) => {
    const response = await fetchRoute(origin, destination);
    return response;
  }
);

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    clearRouteData: (state) => {
      state.routeData = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRouteData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRouteData.fulfilled, (state, action: PayloadAction<RouteData>) => {
        state.status = 'succeeded';
        state.routeData = action.payload;
      })
      .addCase(fetchRouteData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch route';
      });
  },
});

export const { clearRouteData } = routeSlice.actions;
export default routeSlice.reducer;
