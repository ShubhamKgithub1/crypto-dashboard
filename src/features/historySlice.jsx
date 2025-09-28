import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPriceHistoryDataApi } from "../services/cryptoApi";

export const fetchPriceHistoryData = createAsyncThunk(
  "history/fetchPriceHistoryData",
  async () => {
    return fetchPriceHistoryDataApi();
  }
);

const initialState = {
  coinsHistory: {},
  marketCapHistory: [],
  status: "idle",
  lastUpdated: null,
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    clearHistoryData(state) {
      state.coinsHistory = {};
      state.marketCapHistory = [];
      state.dominanceHistory = [];
      state.status = "idle";
      state.error = null;
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceHistoryData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPriceHistoryData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coinsHistory = action.payload.coinsHistory;
        state.marketCapHistory = action.payload.marketCapHistory;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchPriceHistoryData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch market data";
      });
  },
});

export const { clearHistoryData } = historySlice.actions;

export const selectCoinsHistory = (state) => state.history.coinsHistory;
export const selectMarketCapHistory = (state) => state.history.marketCapHistory;
export const selectCoinsHistoryStatus = (state) => state.history.status;
export const selectCoinsHistoryError = (state) => state.history.error;
export const selectCoinsHistoryLastUpdated = (state) =>
  state.history.lastUpdated;

export default historySlice.reducer;
