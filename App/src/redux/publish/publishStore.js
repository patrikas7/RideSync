import { configureStore } from "@reduxjs/toolkit";
import publishReducer from "./publishSlice";

export const publishStore = configureStore({
  reducer: {
    publish: publishReducer,
  },
});
