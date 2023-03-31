import { useNavigation, useRoute } from "@react-navigation/native";
import { ProfileDetailsScreenStyles } from "./ProfileStyles";
import { useState } from "react";
import Container from "../../Components/Container/Container";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import ListItem from "../../Components/List/ListItem";
import Spinner from "react-native-loading-spinner-overlay";
import * as SecureStore from "expo-secure-store";
import useUserData from "../../hooks/useUserData";

const ProfileSettingsScreen = ({ mainNavigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dd = useUserData();
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params;
  useScreenArrowBack(navigation, PageNames.PROFILE_OVERVIEW, {
    user,
  });

  const logout = async () => {
    setIsLoading(true);
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("id");
      mainNavigation.navigate(PageNames.LOGIN);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  console.log(dd);

  return (
    <Container>
      <Spinner visible={isLoading} />
      <ListItem
        icon={"camera-outline"}
        text={"Pakeisti profilio nuotrauką"}
        itemStyling={ProfileDetailsScreenStyles.listItem}
        onPress={() =>
          navigation.navigate(PageNames.PROFILE_PICTURE_EDIT, { user })
        }
      />

      <ListItem
        icon={"log-out-outline"}
        text={"Atsijungti"}
        itemStyling={ProfileDetailsScreenStyles.listItem}
        onPress={logout}
      />

      <ListItem
        icon={"trash-outline"}
        text={"Naikinti profilį"}
        itemStyling={ProfileDetailsScreenStyles.listItem}
      />
    </Container>
  );
};

export default ProfileSettingsScreen;
