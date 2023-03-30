import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { ProfileValueEditScreenStyles } from "./ProfileStyles";
import { showMessage } from "react-native-flash-message";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import InputSearch from "../../Components/Form/InputSearch";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import ErrorMessages from "../../Constants/errorMessages";

const ProfileValueEditScreen = ({ token }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, user, placeholder, placeholder1, placeholder2, field } =
    route.params;
  const isPasswordEdit = field === "password";
  const [value, setValue] = useState(isPasswordEdit ? "" : user[field]);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useScreenArrowBack(
    navigation,
    PageNames.PROFILE_DETAILS,
    { user },
    "close-outline"
  );

  const handleOnSavePress = async () => {
    if (value === user[field]) {
      redirectBack(user);
      return;
    }

    if (!value) {
      displayError(ErrorMessages.EMPTY_FIELD);
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.put(
        "/user",
        {
          field,
          value,
        },
        { headers: { Authorization: token } }
      );

      redirectBack(data.user);
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnPasswordEditSave = async () => {
    if (!value || !newPassword || !newPasswordRepeat) {
      displayError(ErrorMessages.ALL_FIELDS_ARE_REQUIRED);
      return;
    }

    if (newPassword !== newPasswordRepeat) {
      displayError(ErrorMessages.NOT_MATCHING_PASSWORDS);
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 20) {
      displayError(ErrorMessages.PASSWORD_FORMAT);
      return;
    }

    await updatePassword();
  };

  const updatePassword = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.put(
        "/user/password",
        {
          password: value,
          newPassword,
        },
        { headers: { Authorization: token } }
      );

      showMessage({
        message: "Naujas slaptažodis buvo išsaugotas",
        type: "success",
      });

      redirectBack(data.user);
    } catch (error) {
      if (error.response) {
        displayError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const displayError = (message) => {
    showMessage({
      message: message,
      type: "danger",
    });
  };

  const redirectBack = (userDetails) => {
    navigation.navigate(PageNames.PROFILE_DETAILS, { user: userDetails });
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <View style={ProfileValueEditScreenStyles.container}>
        <Header text={title} size={Sizes.HEADER_MEDIUM} />
        <InputSearch
          placeholder={placeholder}
          value={value}
          onChange={setValue}
          styling={ProfileValueEditScreenStyles.input}
          secureTextEntry={isPasswordEdit}
        />

        {isPasswordEdit && (
          <>
            <InputSearch
              placeholder={placeholder1}
              value={newPassword}
              onChange={setNewPassword}
              styling={ProfileValueEditScreenStyles.input}
              secureTextEntry={true}
            />
            <InputSearch
              placeholder={placeholder2}
              value={newPasswordRepeat}
              onChange={setNewPasswordRepeat}
              styling={ProfileValueEditScreenStyles.input}
              secureTextEntry={true}
            />
          </>
        )}
      </View>
      <Button
        text={"Išsaugoti"}
        styling={ProfileValueEditScreenStyles.button}
        onClick={isPasswordEdit ? handleOnPasswordEditSave : handleOnSavePress}
      />
    </Container>
  );
};

export default ProfileValueEditScreen;
