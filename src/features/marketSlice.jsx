import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGlobalDataApi } from "../services/cryptoApi";

export const fetchGlobalData = createAsyncThunk(
  "market/fetchGlobalData",
  async () => {
    return await fetchGlobalDataApi();
  }
);

const initialState = {
  globalStats: {},
  globalStatus: "idle",
  error: null,
  lastUpdated: null,
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    clearMarketData(state) {
      state.coins = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalData.pending, (state) => {
        state.globalStatus = "loading";
        state.error = null;
      })
      .addCase(fetchGlobalData.fulfilled, (state, action) => {
        const d = action.payload.data;

        state.globalStatus = "succeeded";
        state.globalStats = {
          activeCryptos: d.active_cryptocurrencies,
          markets: d.markets,
          totalMarketCap: d.total_market_cap.usd,
          totalVolume: d.total_volume.usd,
          btcDominance: d.market_cap_percentage.btc,
          ethDominance: d.market_cap_percentage.eth,
          marketCapChange24h: d.market_cap_change_percentage_24h_usd,
          lastUpdated: d.updated_at,
        };
        state.lastUpdated = Date.now();
      })
      .addCase(fetchGlobalData.rejected, (state, action) => {
        state.globalStatus = "failed";
        state.error = action.error?.message || "Failed to fetch global data";
      });
  },
});

export const { clearMarketData } = marketSlice.actions;

export const selectMarketError = (state) => state.market.error;
export const selectMarketLastUpdated = (state) => state.market.lastUpdated;
export const selectGlobalStats = (state) => state.market.globalStats;
export const selectGlobalStatus = (state) => state.market.globalStatus;
export const selectDominanceData = (state) => {
  const { btcDominance, ethDominance } = state.market.globalStats || {};
  return [
    { name: "BTC", value: btcDominance },
    { name: "ETH", value: ethDominance },
    {
      name: "Others",
      value: 100 - (btcDominance + ethDominance),
    },
  ];
};

export default marketSlice.reducer;
