import { configureStore } from "@reduxjs/toolkit";
import { publishSlice, publishErrorsSlice } from "./publishSlice";

export const publishStore = configureStore({
  reducer: {
    publish: publishSlice.reducer,
    publishErrors: publishErrorsSlice.reducer,
  },
});
