import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMarketsSnapshotApi } from "../services/cryptoApi";

export const fetchMarketsSnapshot = createAsyncThunk(
  "marketsSnapshot/fetchMarketsSnapshot",
  async () => await fetchMarketsSnapshotApi()
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
export default marketsSnapshotSlice.reducer;
