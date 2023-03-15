import { createSlice } from "@reduxjs/toolkit";
import { getFormatedTodaysDate } from "../../Utils/utils";

const initialEmptyState = {
  departure: {},
  destination: {},
  stops: [],
  date: getFormatedTodaysDate(),
  time: "00:00",
  personsCount: "",
  price: "",
  comments: "",
  isTripFree: false,
  isRoundTrip: false,
  returnDate: getFormatedTodaysDate(),
  returnTime: "00:00",
};

const initialErrorState = {
  destination: "",
  personsCount: "",
  price: "",
};

export const publishSlice = createSlice({
  name: "publish",
  initialState: initialEmptyState,
  reducers: {
    setDeparture: (state, action) => {
      state.departure = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload.date;
      state.time = action.payload.time;
    },
    setReturnDate: (state, action) => {
      state.returnDate = action.payload.date;
      state.returnTime = action.payload.time;
    },
    setPersonsCount: (state, action) => {
      state.personsCount = action.payload;
    },
    addStop: (state, action) => {
      state.stops.push(action.payload);
    },
    updateStop: (state, action) => {
      state.stops[action.payload.index] = action.payload.stop;
    },
    removeStop: (state, action) => {
      state.stops.splice(action.payload, 1);
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    toggleIsTripFree: (state) => {
      state.isTripFree = !state.isTripFree;
    },
    toggleIsRoundTrip: (state) => {
      state.isRoundTrip = !state.isRoundTrip;
    },
    resetState: (state) => {
      state = initialEmptyState;
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
    setPersonsCountError: (state, action) => {
      state.personsCount = action.payload;
    },
    setPriceError: (state, action) => {
      state.price = action.payload;
    },
    resetErrors: (state) => {
      state = initialErrorState;
    },
  },
});

export const {
  setDeparture,
  setDestination,
  setPersonsCount,
  setDate,
  setPrice,
  setComments,
  addStop,
  updateStop,
  removeStop,
  toggleIsTripFree,
  toggleIsRoundTrip,
  setReturnDate,
  resetState,
} = publishSlice.actions;

export const {
  setDestinationError,
  setPersonsCountError,
  setPriceError,
  resetErrors,
} = publishErrorsSlice.actions;
