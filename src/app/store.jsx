import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "../features/marketSlice";
import topCoinsReducer from "../features/topCoinsSlice";
import priceHistoryReducer from "../features/priceHistorySlice";

export const store = configureStore({
  reducer: {
    market: marketReducer,
    priceHistory : priceHistoryReducer,
    topCoins: topCoinsReducer,
  },
});
