import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "../features/marketSlice";
import historyReducer from "../features/historySlice";
import marketsSnapshotReducer from "../features/marketsSnapshotSlice";
import newsReducer from "../features/newsSlice";
import modalReducer from "../features/modalSlice";

export const store = configureStore({
  reducer: {
    marketsSnapshot: marketsSnapshotReducer,
    market: marketReducer,
    history : historyReducer,
    news : newsReducer,
    modal : modalReducer,
  },
});
