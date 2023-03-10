import { createSlice } from "@reduxjs/toolkit";
import { getFormatedTodaysDate } from "../../Utils/utils";

const initialState = {
  departure: {},
  destination: {},
  stops: [],
  date: getFormatedTodaysDate(),
  time: "00:00",
  personsCount: "",
};

const initialErrorState = {
  destination: "",
  date: "",
  personsCount: "",
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
      state.date = action.payload.date;
      state.time = action.payload.time;
    },
    setPersonsCount: (state, action) => {
      state.personsCount = action.payload;
    },
    addStop: (state, action) => {
      state.stops.push(action.payload);
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
    setDeteError: (state, action) => {
      state.date = action.payload;
    },
    setPersonsCountError: (state, action) => {
      state.personsCount = action.payload;
    },
  },
});

export const { setDeparture, setDestination, setDate, addStop } =
  publishSlice.actions;

export const { setDestinationError } = publishErrorsSlice.actions;
