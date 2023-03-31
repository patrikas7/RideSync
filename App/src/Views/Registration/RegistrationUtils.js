import PageNames from "../../Constants/pageNames";

export const getNextPageName = (pageName) => {
  if (pageName === PageNames.REGISTRATION_NAME)
    return PageNames.REGISTRATION_PASSWORD;
  if (pageName === PageNames.REGISTRATION_PASSWORD)
    return PageNames.REGISTRATION_BIRTH;
};

export const getPrevPage = (pageName) => {
  if (pageName === PageNames.REGISTRATION_PASSWORD)
    return PageNames.REGISTRATION_NAME;
  if (pageName === PageNames.REGISTRATION_BIRTH)
    return PageNames.REGISTRATION_PASSWORD;

  return PageNames.LOGIN;
};

export const getHeaderLabel = (pageName) => {
  if (pageName === PageNames.REGISTRATION_NAME) return "Prisistatykite";
  if (pageName === PageNames.REGISTRATION_PASSWORD)
    return "Įveskite slaptažodį";
  return "Įveskite lytį ir amžių";
};

export const getScreenFieldsState = (pageName, state) => {
  if (pageName === PageNames.REGISTRATION_NAME)
    return { name: state.name, surname: state.surname, email: state.email };
  if (pageName === PageNames.REGISTRATION_PASSWORD)
    return { password: state.password, passwordRepeat: state.passwordRepeat };

  return { dateOfBirth: state.dateOfBirth, gender: state.gender };
};

export const Genders = [
  {
    label: "Vyras",
    value: "MALE",
  },
  {
    label: "Moteris",
    value: "FEMALE",
  },
];

export const isEligableAge = (selectedDate) => {
  const birthday = new Date(selectedDate);
  return (
    ((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(0) >= 18
  );
};
