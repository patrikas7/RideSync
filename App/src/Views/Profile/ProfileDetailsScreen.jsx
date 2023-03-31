import { ProfileDetailsScreenStyles } from "./ProfileStyles";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import ListItem from "../../Components/List/ListItem";

const ProfileDetailsScreen = ({ navigation, route }) => {
  const { user } = route.params;
  useScreenArrowBack(navigation, PageNames.PROFILE_OVERVIEW, {
    user,
  });

  const handleOnEditPress = (props) => {
    if (props.field === "dateOfBirth") {
      navigation.navigate(PageNames.PROFILE_BIRTHDATE_EDIT, { ...props, user });
      return;
    }

    if (props.field === "gender") {
      navigation.navigate(PageNames.PROFILE_GENDER_EDIT, { ...props, user });
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
        onPress={() =>
          handleOnEditPress({
            value: user.gender,
            title: "Pasirinkite savo lytį",
            field: "gender",
          })
        }
      />

      <ListItem
        icon={"call-outline"}
        text={"Telefono numeris"}
        secondaryText={user?.phoneNumber ? user.phoneNumber : "-"}
        itemStyling={ProfileDetailsScreenStyles.listItem}
        onPress={() =>
          handleOnEditPress({
            value: user?.phoneNumber || "",
            title: "Įveskite savo tel. numerį",
            placeholder: "Telefono numeris",
            field: "phoneNumber",
          })
        }
      />

      <ListItem
        icon={"lock-closed-outline"}
        text={"Slaptažodis"}
        itemStyling={ProfileDetailsScreenStyles.listItem}
        onPress={() =>
          handleOnEditPress({
            title: "Pasirinkite naują slaptažodį",
            field: "password",
            placeholder: "Dabartinis slaptažodis",
            placeholder1: "Naujas slaptažodis",
            placeholder2: "Pakartokite naują slaptažodį",
          })
        }
      />
    </Container>
  );
};

export default ProfileDetailsScreen;
