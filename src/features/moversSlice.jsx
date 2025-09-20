import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMoversDataApi } from "../services/cryptoApi";

export const fetchMoversData = createAsyncThunk(
  "movers/fetchMoversData",
  async () => {
    return await fetchMoversDataApi();
  }
);

const initialState = {
  coins: [],
  status: "idle",
  error: null,
  lastUpdated: null,
};

const moversSlice = createSlice({
  name: "movers",
  initialState,
  reducers: {
    clearMoversSlice(state) {
      state.movers.coins = [];
      state.movers.status = "idle";
      state.movers.error = null;
      state.movers.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoversData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMoversData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchMoversData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch market data";
      });
  },
});

export const { clearMoversSlice } = moversSlice.actions;

export const selectMoversSliceData = (state) => state.movers.coins;
export const selectMoversSliceStatus = (state) => state.movers.status;
export const selectMoversSliceError = (state) => state.movers.error;
export const selectMoversSliceLastUpdated = (state) => state.movers.lastUpdated;

export default moversSlice.reducer;
