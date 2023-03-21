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
