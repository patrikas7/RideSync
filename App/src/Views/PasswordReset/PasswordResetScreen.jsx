import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import Container from "../../Components/Container/Container";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Sizes from "../../Constants/sizes";
import InputSearch from "../../Components/Form/InputSearch";
import Button from "../../Components/Button/Button";
import ErrorMessages from "../../Constants/errorMessages";
import { showMessage } from "react-native-flash-message";
import { postChangePassword } from "../../API/authApi";

const PasswordResetScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [code, setCode] = useState("");
  const { email } = useRoute();

  useScreenArrowBack(navigation, PageNames.PASSWORD_RESET_EMAIL);

  const handleOnSave = async () => {
    if (!code || !newPassword || !newPasswordRepeat) {
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

    setIsLoading(true);
    const response = await postChangePassword({ email, newPassword, code });
    setIsLoading(false);

    if (response?.error) {
      displayError(ErrorMessages.PASSWORD_FORMAT);
      return;
    }

    showMessage({
      message: "Slaptažodis buvo sėkmingai pakeistas",
      type: "success",
    });

    navigation.navigate(PageNames.LOGIN);
  };

  const displayError = (message) => {
    showMessage({
      message,
      type: "danger",
    });
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <View style={{ flex: 1, marginTop: 32 }}>
        <Text
          style={{ textAlign: "center", fontSize: Sizes.DEFAULT_TEXT_SIZE }}
        >
          Įveskite naują slaptažodį ir patvirtimo kodą, kurį gavote į savo el.
          paštą
        </Text>

        <InputSearch
          placeholder={"Naujas slaptažodis"}
          value={newPassword}
          onChange={setNewPassword}
          secureTextEntry={true}
          styling={{ marginTop: 16 }}
        />
        <InputSearch
          placeholder={"Pakartokite naują slaptažodį"}
          value={newPasswordRepeat}
          onChange={setNewPasswordRepeat}
          secureTextEntry={true}
          styling={{ marginTop: 16 }}
        />
        <InputSearch
          placeholder={"Patvirtinimo kodas"}
          value={code}
          onChange={setCode}
          styling={{ marginTop: 16 }}
        />
      </View>

      <Button
        text={"Išsaugoti"}
        styling={{ marginBottom: 32 }}
        onClick={handleOnSave}
      />
    </Container>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({});
