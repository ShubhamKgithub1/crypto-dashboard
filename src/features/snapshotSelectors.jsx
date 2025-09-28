import { createSelector } from "@reduxjs/toolkit";

// base
export const selectMarketsSnapshot = (state) => state.marketsSnapshot.data || [];
export const selectSnapshotStatus = (state) => state.marketsSnapshot.status;
export const selectSnapshotError = (state) => state.marketsSnapshot.error;

// 1) StatCards: fixed list of coin ids you want on dashboard
const STAT_CARD_IDS = ["bitcoin", "ethereum", "solana", "dogecoin"];
export const selectStatCards = createSelector(
  [selectMarketsSnapshot],
  (coins) => STAT_CARD_IDS.map((id) => coins.find((c) => c.id === id)).filter(Boolean)
);

// 2) Single coin by id (non-memoized simple getter)
export const selectCoinById = (id) => (state) =>
  (state.marketsSnapshot.data || []).find((c) => c.id === id);

// 3) Top 10 by market cap (memoized)
export const selectTopCoinsOverall = createSelector(
  [selectMarketsSnapshot],
  (coins) => [...coins].sort((a, b) => b.market_cap - a.market_cap).slice(0, 10)
);

// 4) Top 10 by 24h volume (memoized)
export const selectTopCoinsDaily = createSelector(
  [selectMarketsSnapshot],
  (coins) => [...coins].sort((a, b) => b.total_volume - a.total_volume).slice(0, 10)
);

// 5) Movers (top absolute 24h change, or top gainers/losers)
export const selectTopGainers = createSelector(
  [selectMarketsSnapshot],
  (coins) =>
    [...coins]
      .filter((c) => typeof c.price_change_percentage_24h === "number")
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 3)
);

export const selectTopLosers = createSelector(
  [selectMarketsSnapshot],
  (coins) =>
    [...coins]
      .filter((c) => typeof c.price_change_percentage_24h === "number")
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 3)
);
