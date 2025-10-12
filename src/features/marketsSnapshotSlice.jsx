import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMarketsSnapshotApi } from "../services/cryptoApi";

export const fetchMarketsSnapshot = createAsyncThunk(
  "marketsSnapshot/fetchMarketsSnapshot",
  async () => {
    const cacheKey = "marketSnapshotCache";
    const timeLimit = 1000 * 60 * 5;
    const now = Date.now();

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      const isFresh = now - parsed.timestamp < timeLimit;

      if (isFresh) {
        console.log("✅ Using cached market snapshot");
        return parsed.data;
      }
    }

    console.log("🌐 Fetching new market snapshot...");
    const data = await fetchMarketsSnapshotApi();
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data,
        timestamp: now,
      })
    );
    return data;
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
  lastUpdated: null,
};

const marketsSnapshotSlice = createSlice({
  name: "marketsSnapshot",
  initialState,
  reducers: {
    clearSnapshot(state) {
      state.data = [];
      state.status = "idle";
      state.error = null;
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketsSnapshot.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMarketsSnapshot.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchMarketsSnapshot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch snapshot";
      });
  },
});

export const { clearSnapshot } = marketsSnapshotSlice.actions;
export const selectMarketsSnapshot = (state) => state.marketsSnapshot.data;
export const selectSnapshotStatus = (state) => state.marketsSnapshot.status;
export const selectSnapshotLastUpdated = (state) => state.marketsSnapshot.lastUpdated;
export default marketsSnapshotSlice.reducer;
