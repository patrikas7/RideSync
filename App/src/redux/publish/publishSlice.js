import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departure: {},
  destination: {},
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
  },
});

export const { setDeparture, setDestination } = publishSlice.actions;

export default publishSlice.reducer;
