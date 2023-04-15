import { Alert } from "react-native";

export const hasObjectEmptyValues = (obj) => Object.values(obj).some((x) => !x);

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

export const getErrorState = (fields, errorMessage) => {
  let errors = {};
  Object.keys(fields).forEach((key) => {
    if (!fields[key]) errors = { ...errors, [key]: errorMessage };
  });

  return errors;
};

export const getFormatedTodaysDate = () => {
  const date = new Date();
  return date.toISOString().split("T")[0];
};

export const getFormatedDateTime = (date) => {
  const isoString = new Date(date).toISOString();
  const year = isoString.slice(0, 4);
  const month = isoString.slice(5, 7);
  const day = isoString.slice(8, 10);
  const hours = isoString.slice(11, 13);
  const minutes = isoString.slice(14, 16);
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const isTimeLaterOrEqual = (time) => {
  const now = new Date();
  const [hours, minutes] = time.split(":");
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );

  return targetTime >= now;
};

export const count18YearsInThePast = () => {
  const today = new Date();
  const pastYear = today.getFullYear() - 18;
  const pastDate = new Date(pastYear, today.getMonth(), today.getDate());
  const formattedDate = pastDate.toISOString().slice(0, 10);
  return formattedDate;
};

export const generatePictureUri = (profilePicture) => {
  if (!profilePicture?.buffer) return undefined;
  return `data:${profilePicture.type};base64,${profilePicture.buffer}`;
};

export const calculateAge = (dateString) => {
  var birthday = new Date(dateString);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const printError = (error) => {
  if (error.response) {
    console.error(error.response.data);
    return;
  }

  console.error(error);
};

export const constructCarsList = (carsList) =>
  carsList.map((car) => ({
    label: `${car.manufacturer} ${car.model} ${car.licensePlateNumber}`,
    value: car._id,
  }));

export const alert = (headline, secondaryText, onPress) => {
  Alert.alert(headline, secondaryText, [
    {
      text: "Ne",
    },
    {
      text: "Taip",
      onPress,
    },
  ]);
};

export const isMessageBetweenUsers = (message, user, receiver) =>
  (message.user === user.id || message.sender === user.id) &&
  (message.user === receiver || message.sender === receiver);
