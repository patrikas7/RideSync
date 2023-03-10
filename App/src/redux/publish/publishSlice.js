import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departure: {},
  destination: {},
  date: "",
};

const initialErrorState = {
  destination: "",
};

export const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    setDeparture: (state, action) => {
      state.departure = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const publishErrorsSlice = createSlice({
  name: "publishErrors",
  initialState: initialErrorState,
  reducers: {
    setDestinationError: (state, action) => {
      state.destination = action.payload;
    },
  },
});

export const { setDeparture, setDestination, setDate } = publishSlice.actions;

export const { setDestinationError } = publishErrorsSlice.actions;
