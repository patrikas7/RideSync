import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { ProfileValueEditScreenStyles } from "./ProfileStyles";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import InputSearch from "../../Components/Form/InputSearch";
import Spinner from "react-native-loading-spinner-overlay/lib";

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

  const handleOnSavePress = () => {
    if (value === user[field]) redirectBack();
    setIsLoading(true);

    try {
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectBack = () => {
    navigation.navigate(PageNames.PROFILE_DETAILS, { user });
  };

  return (
    <Container>
      <Spinner isLoading={isLoading} />
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
