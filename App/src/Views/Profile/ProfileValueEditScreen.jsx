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
  const { title, user, placeholder, field } = route.params;
  const [value, setValue] = useState(user[field]);
  const [isLoading, setIsLoading] = useState(false);
  useScreenArrowBack(
    navigation,
    PageNames.PROFILE_DETAILS,
    { user },
    "close-outline"
  );

  const handleOnSavePress = async () => {
    if (value === user[field]) redirectBack(user);
    if (!value) {
      showMessage({
        message: ErrorMessages.EMPTY_FIELD,
        type: "danger",
      });

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
        />
      </View>
      <Button
        text={"Išsaugoti"}
        styling={ProfileValueEditScreenStyles.button}
        onClick={handleOnSavePress}
      />
    </Container>
  );
};

export default ProfileValueEditScreen;
