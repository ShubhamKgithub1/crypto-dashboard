import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPriceHistoryDataApi } from "../services/cryptoApi";

export const fetchPriceHistoryData = createAsyncThunk(
    "priceHistory/fetchPriceHistoryData",
    async () =>{
        return fetchPriceHistoryDataApi();
    }
);

const initialState = {
  history: [],
  status: "idle",
  lastUpdated: null,
  error: null,
};

const priceHistorySlice = createSlice({
  name: "priceHistory",
  initialState,
  reducers: {
    clearPriceHistoryData(state) {
      state.history = [];
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
          state.history = action.payload;
          state.lastUpdated = Date.now();
        })
        .addCase(fetchPriceHistoryData.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error?.message || "Failed to fetch market data";
        });
    },
});


export const {clearPriceHistoryData} = priceHistorySlice.actions;

export const selectPriceHistory = (state) => state.priceHistory.history;
export const selectPriceHistoryStatus = (state) => state.priceHistory.history;
export const selectPriceHistoryError = (state) => state.priceHistory.history;
export const selectPriceHistoryLastUpdated = (state) => state.priceHistory.history;

export default priceHistorySlice.reducer;