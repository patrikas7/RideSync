import { createSlice } from "@reduxjs/toolkit";
import { Genders } from "../../Views/Registration/RegistrationUtils";

const initialState = {
  name: "",
  surname: "",
  email: "",
  password: "",
  passwordRepeat: "",
  dateOfBirth: "",
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    ...initialState,
    gender: Genders[0].value,
    isBussinessRegistration: false,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSurname: (state, action) => {
      state.surname = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordRepeat: (state, action) => {
      state.passwordRepeat = action.payload;
    },
    setDateOfBirth: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    toggleRegistrationType: (state) => {
      state.isBussinessRegistration = !state.isBussinessRegistration;
    },
    resetState: () => ({
      ...initialState,
      gender: Genders[0].value,
    }),
  },
});

export const registrationErrorsSlice = createSlice({
  name: "registrationErrors",
  initialState,
  reducers: {
    setErrors: (state, action) => ({ ...state, ...action.payload }),
    resetErrors: () => initialState,
  },
});

export const {
  setName,
  setSurname,
  setEmail,
  setPassword,
  setPasswordRepeat,
  setDateOfBirth,
  setGender,
  resetState,
  toggleRegistrationType,
} = registrationSlice.actions;
export const { resetErrors, setErrors } = registrationErrorsSlice.actions;
