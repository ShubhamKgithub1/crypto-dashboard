import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMarketData as fetchMarketDataApi } from "../services/cryptoApi";

export const fetchMarketData = createAsyncThunk (
    "market/fetchMarketData",
    async () => {
        return await fetchMarketDataApi();
    }
);

const initialState = {
    coins: [], 
    status : "idle",
    error : null,
    lastUpdated : null,
};

const marketSlice = createSlice({
 name : "market",
 initialState,
 reducers : {
    clearMarketData (state) {
        state.coins = [];
        state.status = "idle";
        state.error = null;
    },
 },
 extraReducers: (builder) => {
    builder
      .addCase(fetchMarketData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMarketData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchMarketData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch market data";
      });
  },
});

export const { clearMarketData } = marketSlice.actions;

// Selectors
export const selectMarketCoins = (state) => state.market.coins;
export const selectMarketStatus = (state) => state.market.status;
export const selectMarketError = (state) => state.market.error;
export const selectMarketLastUpdated = (state) => state.market.lastUpdated;

export default marketSlice.reducer;