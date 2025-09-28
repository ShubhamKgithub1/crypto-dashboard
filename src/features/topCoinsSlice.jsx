import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchTopCoinsOverallApi,
  fetchTopCoinsDailyApi,
} from "../services/cryptoApi";

export const fetchTopCoinsOverall = createAsyncThunk(
  "topCoins/fetchOverall",
  async () => {
    return await fetchTopCoinsOverallApi();
  }
);

export const fetchTopCoinsDaily = createAsyncThunk(
  "topCoins/fetchDaily",
  async () => {
    return await fetchTopCoinsDailyApi();
  }
);

const initialState = {
  overallCoins: [],
  dailyCoins: [],
  statusOverall: "idle",
  statusDaily: "idle",
  errorOverall: null,
  errorDaily: null,
  lastUpdatedOverall: null,
  lastUpdatedDaily: null,
};

const topCoinsSlice = createSlice({
  name: "topCoins",
  initialState,
  reducers: {
    clearTopCoinsData(state) {
      state.overallCoins = [];
      state.dailyCoins = [];
      state.statusOverall = "idle";
      state.statusDaily = "idle";
      state.errorOverall = null;
      state.errorDaily = null;
      state.lastUpdatedOverall = null;
      state.lastUpdatedDaily = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCoinsOverall.pending, (state) => {
        state.statusOverall = "loading";
        state.errorOverall = null;
      })
      .addCase(fetchTopCoinsOverall.fulfilled, (state, action) => {
        state.statusOverall = "succeeded";
        state.overallCoins = action.payload;
        state.lastUpdatedOverall = Date.now();
      })
      .addCase(fetchTopCoinsOverall.rejected, (state, action) => {
        state.statusOverall = "failed";
        state.errorOverall = action.error?.message || "Failed to fetch overall coins";
      });

    builder
      .addCase(fetchTopCoinsDaily.pending, (state) => {
        state.statusDaily = "loading";
        state.errorDaily = null;
      })
      .addCase(fetchTopCoinsDaily.fulfilled, (state, action) => {
        state.statusDaily = "succeeded";
        state.dailyCoins = action.payload;
        state.lastUpdatedDaily = Date.now();
      })
      .addCase(fetchTopCoinsDaily.rejected, (state, action) => {
        state.statusDaily = "failed";
        state.errorDaily = action.error?.message || "Failed to fetch daily coins";
      });
  },
});

export const { clearTopCoinsData } = topCoinsSlice.actions;

export const selectTopCoinsOverall = (state) => state.topCoins.overallCoins;
export const selectTopCoinsDaily = (state) => state.topCoins.dailyCoins;

export const selectTopCoinsStatusOverall = (state) => state.topCoins.statusOverall;
export const selectTopCoinsStatusDaily = (state) => state.topCoins.statusDaily;

export const selectTopCoinsErrorOverall = (state) => state.topCoins.errorOverall;
export const selectTopCoinsErrorDaily = (state) => state.topCoins.errorDaily;

export const selectTopCoinsLastUpdatedOverall = (state) =>
  state.topCoins.lastUpdatedOverall;
export const selectTopCoinsLastUpdatedDaily = (state) =>
  state.topCoins.lastUpdatedDaily;

export default topCoinsSlice.reducer;