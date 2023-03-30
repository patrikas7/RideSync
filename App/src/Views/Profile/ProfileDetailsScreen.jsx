import { useNavigation, useRoute } from "@react-navigation/native";
import { ProfileDetailsScreenStyles } from "./ProfileStyles";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import ListItem from "../../Components/List/ListItem";

const ProfileDetailsScreen = ({ token }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  useScreenArrowBack(navigation, PageNames.PROFILE_OVERVIEW, {
    user,
  });

  const handleOnEditPress = (props) => {
    if (props.field === "dateOfBirth") {
      navigation.navigate(PageNames.PROFILE_BIRTHDATE_EDIT, { ...props, user });
      return;
    }

    navigation.navigate(PageNames.PROFILE_VALUE_EDIT, { ...props, user });
  };

  return (
    <Container>
      <ListItem
        icon={"person-outline"}
        text={"Vardas"}
        secondaryText={user.name}
        itemStyling={ProfileDetailsScreenStyles.listItem}
        onPress={() =>
          handleOnEditPress({
            title: "Įveskite savo vardą",
            placeholder: "Vardas",
            field: "name",
          })
        }
      />

      <ListItem
        icon={"person-outline"}
        text={"Pavardė"}
        secondaryText={user.surname}
        itemStyling={ProfileDetailsScreenStyles.listItem}
        onPress={() =>
          handleOnEditPress({
            title: "Įveskite savo pavardę",
            placeholder: "Pavardė",
            field: "surname",
          })
        }
      />

      <ListItem
        icon={"calendar-outline"}
        text={"Gimimo data"}
        secondaryText={user.dateOfBirth.slice(0, 10)}
        itemStyling={ProfileDetailsScreenStyles.listItem}
        onPress={() =>
          handleOnEditPress({
            title: "Pasirinkite savo gimimo datą",
            field: "dateOfBirth",
          })
        }
      />

      <ListItem
        icon={"mail-outline"}
        text={"El. Paštas"}
        secondaryText={user.email}
        itemStyling={ProfileDetailsScreenStyles.listItem}
        onPress={() =>
          handleOnEditPress({
            value: user.email,
            title: "Įveskite savo el. paštą",
            placeholder: "El. Paštas",
            field: "email",
          })
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
    </Container>
  );
};

export default ProfileDetailsScreen;
