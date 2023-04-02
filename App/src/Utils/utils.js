export const hasObjectEmptyValues = (obj) => Object.values(obj).some((x) => !x);

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
