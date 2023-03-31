import { Text, View, Image } from "react-native";
import LoginForm from "../../Components/Login/LoginForm";
import Button, { ButtonColor } from "../../Components/Button/Button";
import Header from "../../Components/Form/Header";
import PageNames from "../../Constants/pageNames";
import Spinner from "react-native-loading-spinner-overlay";
import { useCallback, useState } from "react";
import { getErrorState, hasObjectEmptyValues } from "../../Utils/utils";
import ErrorMessages from "../../Constants/errorMessages";
import { useFocusEffect } from "@react-navigation/native";
import LoginStyles from "./LoginStyles";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const initialState = { email: "", password: "" };

const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  useFocusEffect(
    useCallback(() => {
      setFormState(initialState);
      setErrors(initialState);
    }, [])
  );

  const handleOnSubmit = async () => {
    setErrors(initialState);
    if (hasEmptyValues()) return;
    setIsLoading(true);

    try {
      const res = await axios.post("/auth/login", formState);
      setSecureToken(res.data?.token, res.data?.id, res.data?.name);
    } catch (error) {
      setErrors({ ...initialState, password: error.response.data?.message });
    }

    setIsLoading(false);
  };

  const setSecureToken = async (token, id, name) => {
    try {
      await SecureStore.setItemAsync("token", token);
      await SecureStore.setItemAsync("id", id);
      navigation.navigate(PageNames.HOME);
    } catch (error) {
      console.log(error);
      setErrors({ ...initialState, password: ErrorMessages.UNEXPECTED_ERROR });
    }
  };

  const hasEmptyValues = () => {
    if (hasObjectEmptyValues(formState)) {
      setErrors((currentState) => ({
        ...currentState,
        ...getErrorState(formState, ErrorMessages.REQUIRED_FIELD),
      }));
      return true;
    }
  };

  return (
    <View style={LoginStyles.formContainer}>
      <Spinner visible={isLoading} />
      <View style={LoginStyles.imageContainer}>
        <Image
          source={require("../../../assets/pictures/login.jpeg")}
          style={LoginStyles.image}
        />
      </View>
      <Header text={"Prisijungimas"} />
      <LoginForm
        formState={formState}
        setFormState={setFormState}
        errors={errors}
      />
      <View style={LoginStyles.buttonsContainer}>
        <Button text={"Prisijungti"} onClick={handleOnSubmit} />
        <View style={LoginStyles.delimiterContainer}>
          <View style={LoginStyles.delimiterLine} />
          <Text style={LoginStyles.delimiterText}>Arba</Text>
          <View style={LoginStyles.delimiterLine} />
        </View>
        <Button
          text={"Registruotis"}
          color={ButtonColor.WHITE}
          onClick={() =>
            navigation.navigate(PageNames.REGISTRATION_NAME, {
              prevPage: PageNames.LOGIN,
              nextPage: PageNames.REGISTRATION_PASSWORD,
            })
          }
        />
      </View>
    </View>
  );
};

export default LoginScreen;
