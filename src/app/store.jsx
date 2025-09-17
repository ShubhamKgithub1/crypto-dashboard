import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "../features/marketSlice";
// import chartReducer from "../features/chart/chartSlice";
// import topCoinsReducer from "../features/topCoins/topCoinsSlice";
// import moversReducer from "../features/movers/moversSlice";

export const store = configureStore({
  reducer: {
    market: marketReducer,
    // chart: chartReducer,
    // topCoins: topCoinsReducer,
    // movers: moversReducer,
  },
});
