import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { publishSlice, publishErrorsSlice } from "./publishSlice";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const publishPersistConfig = {
  key: "publish",
  storage: AsyncStorage,
  whitelist: [],
};

const publishReducer = combineReducers({
  publish: publishSlice.reducer,
  publishErrors: publishErrorsSlice.reducer,
});

const persistedReducer = persistReducer(publishPersistConfig, publishReducer);

export const publishStore = configureStore({
  reducer: persistedReducer,
});
