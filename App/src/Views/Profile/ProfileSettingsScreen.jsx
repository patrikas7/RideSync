import { useNavigation, useRoute } from "@react-navigation/native";
import { ProfileDetailsScreenStyles } from "./ProfileStyles";
import Container from "../../Components/Container/Container";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import ListItem from "../../Components/List/ListItem";

const ProfileSettingsScreen = ({ token }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params;
  useScreenArrowBack(navigation, PageNames.PROFILE_OVERVIEW, {
    user,
  });

  return (
    <Container>
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
