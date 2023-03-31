import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrevPage, isEligableAge } from "./RegistrationUtils";
import { useNavigation } from "@react-navigation/native";
import { getErrorState, hasObjectEmptyValues } from "../../Utils/utils";
import {
  getHeaderLabel,
  getNextPageName,
  getScreenFieldsState,
} from "./RegistrationUtils";
import {
  resetErrors,
  resetState,
  setErrors,
} from "../../redux/registration/registrationSlices";
import { showMessage } from "react-native-flash-message";
import PageNames from "../../Constants/pageNames";
import Header from "../../Components/Form/Header";
import RegistrationForm from "../../Components/Registration/RegistrationForm";
import Button from "../../Components/Button/Button";
import ErrorMessages from "../../Constants/errorMessages";
import axios from "axios";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import Container from "../../Components/Container/Container";
import Spinner from "react-native-loading-spinner-overlay";

const RegistrationScreen = ({ route, mainNavigation }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.registration);
  const [isLoading, setIsLoading] = useState(false);
  useScreenArrowBack(navigation, getPrevPage(route.name));

  const handleOnClick = async () => {
    dispatch(resetErrors());

    if (
      hasEmptyValues() ||
      (route.name === PageNames.REGISTRATION_PASSWORD && !passwordsMatch())
    )
      return;
    if (route.name === PageNames.REGISTRATION_NAME && (await userExists())) {
      dispatch(setErrors({ ["email"]: ErrorMessages.EXISTING_EMAIL }));
      return;
    }
    if (
      route.name === PageNames.REGISTRATION_BIRTH &&
      !isEligableAge(formState.dateOfBirth)
    ) {
      dispatch(setErrors({ ["dateOfBirth"]: ErrorMessages.NOT_ELIGABLE_AGE }));
      return;
    }

    route.name === PageNames.REGISTRATION_BIRTH ? register() : navigate();
  };

  const hasEmptyValues = () => {
    const screenFieldsState = getScreenFieldsState(route.name, formState);
    if (hasObjectEmptyValues(screenFieldsState)) {
      dispatch(
        setErrors(
          getErrorState(screenFieldsState, ErrorMessages.REQUIRED_FIELD)
        )
      );
      return true;
    }
  };

  const passwordsMatch = () => {
    if (formState.password !== formState.passwordRepeat) {
      dispatch(
        setErrors({ ["passwordRepeat"]: ErrorMessages.NOT_MATCHING_PASSWORDS })
      );
      return false;
    }
    if (formState.password.length < 8 || formState.password.length > 20) {
      dispatch(
        setErrors({ ["passwordRepeat"]: ErrorMessages.PASSWORD_FORMAT })
      );
      return false;
    }

    return true;
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
    setIsLoading(true);

    try {
      await axios.post("/auth/register/basicUser", formState);
      showMessage({
        message: "Buvote sėkmingai užregistruotas, dabar galite prisijungti",
        type: "success",
      });
      dispatch(resetState());
      mainNavigation.navigate(PageNames.LOGIN);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = () => {
    navigation.navigate(getNextPageName(route.name), {
      prevPage: route.name,
      nextPage: getNextPageName(getNextPageName(route.name)),
    });
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <Header text={getHeaderLabel(route.name)} />
      <RegistrationForm pageName={route.name} />
      <Button
        text={
          route.name === PageNames.REGISTRATION_BIRTH
            ? "Registruotis"
            : "Toliau"
        }
        onClick={handleOnClick}
      />
    </Container>
  );
};

export default RegistrationScreen;
