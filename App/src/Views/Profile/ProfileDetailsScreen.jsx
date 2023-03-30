import { useNavigation, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { ProfileDetailsScreenStyles } from "./ProfileStyles";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import ListItem from "../../Components/List/ListItem";
import Button from "../../Components/Button/Button";

const ProfileDetailsScreen = ({ token }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  useScreenArrowBack(navigation, PageNames.PROFILE_OVERVIEW);

  const handleOnProfileStringValueEditPress = (
    value,
    title,
    placeholder,
    field
  ) => {
    navigation.navigate(PageNames.PROFILE_VALUE_EDIT, {
      value,
      title,
      user,
      placeholder,
      field,
    });
  };

  return (
    <Container>
      <View style={ProfileDetailsScreenStyles.detailsContainer}>
        <ListItem
          icon={"person-outline"}
          text={"Vardas"}
          secondaryText={user.name}
          itemStyling={ProfileDetailsScreenStyles.listItem}
          onPress={() =>
            handleOnProfileStringValueEditPress(
              user.name,
              "Įveskite savo vardą",
              "Vardas",
              "name"
            )
          }
        />

        <ListItem
          icon={"person-outline"}
          text={"Pavardė"}
          secondaryText={user.surname}
          itemStyling={ProfileDetailsScreenStyles.listItem}
          onPress={() =>
            handleOnProfileStringValueEditPress(
              user.surname,
              "Įveskite savo pavardę",
              "Pavardė",
              "surname"
            )
          }
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
          onPress={() =>
            handleOnProfileStringValueEditPress(
              user.email,
              "Įveskite savo el. paštą",
              "El. Paštas",
              "email"
            )
          }
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
