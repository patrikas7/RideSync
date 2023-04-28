import { useState } from "react";
import { StyleSheet, View } from "react-native";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import InputSearch from "../../Components/Form/InputSearch";
import Container from "../../Components/Container/Container";
import Button from "../../Components/Button/Button";
import { showMessage } from "react-native-flash-message";
import { postSendPasswordReminder } from "../../API/authApi";
import Spinner from "react-native-loading-spinner-overlay/lib";

const PasswordResetEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useScreenArrowBack(navigation, PageNames.LOGIN);

  const handleOnPress = async () => {
    if (!email) {
      showMessage({
        message: "El. pašto laukas negali būti tuščias",
        type: "danger",
      });

      return;
    }

    setIsLoading(true);
    const response = await postSendPasswordReminder(email);
    setIsLoading(false);

    if (response?.error) {
      showMessage({
        message: "Naudotojas buvo nerastas",
        type: "danger",
      });

      return;
    }

    navigation.navigate(PageNames.PASSWORD_RESET, { email });
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <View style={{ flex: 1, marginTop: 16 }}>
        <InputSearch
          placeholder={"El. paštas"}
          value={email}
          onChange={setEmail}
        />
      </View>

      <Button
        text={"Toliau"}
        styling={{ marginBottom: 32 }}
        onClick={handleOnPress}
      />
    </Container>
  );
};

export default PasswordResetEmailScreen;
