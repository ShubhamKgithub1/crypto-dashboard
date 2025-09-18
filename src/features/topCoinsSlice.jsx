import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTopCoinsDataApi } from "../services/cryptoApi";

export const fetchTopCoinsData = createAsyncThunk(
  "topCoins/fetchTopCoinsData",
  async () => {
    return await fetchTopCoinsDataApi();
  }
);

const initialState = {
  coins: [],
  status: "idle",
  error: null,
  lastUpdated: null,
};

const topCoinsSlice = createSlice({
  name: "topCoins",
  initialState,
  reducers: {
    clearTopCoinsData(state) {
      state.coins = [];
      state.status = "idle";
      state.error = null;
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCoinsData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTopCoinsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchTopCoinsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch market data";
      });
  },
});

export const { clearTopCoinsData } = topCoinsSlice.actions;

export const selectTopCoins = (state) => state.topCoins.coins;
export const selectTopCoinsStatus = (state) => state.topCoins.status;
export const selectTopCoinsError = (state) => state.topCoins.error;
export const selectTopCoinsLastUpdated = (state) => state.topCoins.lastUpdated;

export default topCoinsSlice.reducer;