import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  registrationSlice,
  registrationErrorsSlice,
} from "./registrationSlices";

const registrationReducer = combineReducers({
  registrationErrors: registrationErrorsSlice.reducer,
  registration: registrationSlice.reducer,
});

export const registrationStore = configureStore({
  reducer: registrationReducer,
});
