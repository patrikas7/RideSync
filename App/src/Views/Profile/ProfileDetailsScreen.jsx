import { useNavigation, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { ProfileDetailsScreenStyles } from "./ProfileStyles";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import ListItem from "../../Components/List/ListItem";
import Button from "../../Components/Button/Button";

const Genders = { MALE: "Vyras", FEMALE: "Moteris" };

const ProfileDetailsScreen = ({ token }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  useScreenArrowBack(navigation, PageNames.PROFILE_OVERVIEW);

  return (
    <Container>
      <View style={ProfileDetailsScreenStyles.detailsContainer}>
        <ListItem
          icon={"person-outline"}
          text={"Vardas"}
          secondaryText={user.name}
          itemStyling={ProfileDetailsScreenStyles.listItem}
        />

        <ListItem
          icon={"person-outline"}
          text={"Pavardė"}
          secondaryText={user.surname}
          itemStyling={ProfileDetailsScreenStyles.listItem}
        />

        <ListItem
          icon={"calendar-outline"}
          text={"Gimimo data"}
          secondaryText={user.dateOfBirth.slice(0, 10)}
          itemStyling={ProfileDetailsScreenStyles.listItem}
        />

        <ListItem
          icon={"mail-outline"}
          text={"Gimimo data"}
          secondaryText={user.email}
          itemStyling={ProfileDetailsScreenStyles.listItem}
        />

        <ListItem
          icon={`${user.gender.toLowerCase()}-outline`}
          text={"Lytis"}
          secondaryText={user.gender === "MALE" ? "Vyras" : "Moteris"}
          itemStyling={ProfileDetailsScreenStyles.listItem}
        />

        <ListItem
          icon={"lock-closed-outline"}
          text={"Slaptažodis"}
          itemStyling={ProfileDetailsScreenStyles.listItem}
        />
      </View>

      <Button text={"Išsaugoti"} styling={ProfileDetailsScreenStyles.button} />
    </Container>
  );
};

export default ProfileDetailsScreen;
