import { StyleSheet, View } from "react-native";
import { useState } from "react";
import PageNames from "../../Constants/pageNames";
import Header from "../../Components/Form/Header";
import RegistrationForm from "../../Components/Registration/RegistrationForm";
import Button from "../../Components/Button/Button";
import { Genders, isEligableAge } from "./RegistrationUtils";
import ErrorMessages from "../../Constants/errorMessages";
import { getErrorState, hasObjectEmptyValues } from "../../Utils/utils";
import {
  getHeaderLabel,
  getNextPageName,
  getScreenFieldsState,
} from "./RegistrationUtils";
import axios from "axios";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";

const initialState = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  passwordRepeat: "",
  dateOfBirth: "",
};

const RegistrationScreen = ({ route, navigation }) => {
  const [formState, setFormState] = useState({
    ...initialState,
    gender: Genders[0].value,
  });
  const [errors, setErrors] = useState(initialState);
  useScreenArrowBack(navigation, route.params.prevPage);

  const handleOnClick = async () => {
    setErrors(initialState);
    if (
      hasEmptyValues() ||
      (!passwordsMatch() && route.name === PageNames.REGISTRATION_PASSWORD)
    )
      return;
    if (route.name === PageNames.REGISTRATION_NAME && (await userExists())) {
      setErrorFields("email", ErrorMessages.EXISTING_EMAIL);
      return;
    }
    if (
      !isEligableAge(formState.dateOfBirth) &&
      route.name === PageNames.REGISTRATION_BIRTH
    ) {
      setErrorFields("dateOfBirth", ErrorMessages.NOT_ELIGABLE_AGE);
      return;
    }

    route.name === PageNames.REGISTRATION_BIRTH ? register() : navigate();
  };

  const hasEmptyValues = () => {
    const screenFieldsState = getScreenFieldsState(route.name, formState);

    if (hasObjectEmptyValues(screenFieldsState)) {
      setErrors((currentState) => ({
        ...currentState,
        ...getErrorState(screenFieldsState, ErrorMessages.REQUIRED_FIELD),
      }));
      return true;
    }
  };

  const passwordsMatch = () => {
    if (formState.password !== formState.passwordRepeat) {
      setErrorFields("passwordRepeat", ErrorMessages.NOT_MATCHING_PASSWORDS);
      return false;
    }
    if (formState.password.length < 8 || formState.password.length > 20) {
      setErrorFields("passwordRepeat", ErrorMessages.PASSWORD_FORMAT);
      return false;
    }

    return true;
  };

  const setErrorFields = (key, error) => {
    setErrors({
      ...initialState,
      [key]: error,
    });
  };

  const userExists = async () => {
    try {
      const { data } = await axios.get("/user/checkByEmail", {
        params: {
          email: formState.email,
        },
      });

      return data?.userExists;
    } catch (error) {}
  };

  const register = async () => {
    console.log(route);
    try {
      const response = await axios.post("/auth/register/basicUser", formState);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = () => {
    navigation.navigate(getNextPageName(route.name), {
      prevPage: route.name,
      nextPage: getNextPageName(getNextPageName(route.name)),
      formState,
    });
  };

  return (
    <View style={styles.formContainer}>
      <Header text={getHeaderLabel(route.name)} />
      <RegistrationForm
        pageName={route.name}
        formState={formState}
        setFormState={setFormState}
        errors={errors}
      />
      <Button
        text={
          route.name === PageNames.REGISTRATION_BIRTH
            ? "Registruotis"
            : "Toliau"
        }
        onClick={handleOnClick}
      />
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
});
