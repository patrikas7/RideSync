import { Image, Text, View } from "react-native";
import { UserInformationStyles } from "./TripInformationStyles";
import Container from "../../../Components/Container/Container";
import TripPersonRating from "../../../Components/TripInformation/TripPersonRating";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import ListItem from "../../../Components/List/ListItem";
import Button from "../../../Components/Button/Button";
import { calculateAge } from "../../../Utils/utils";

const UserInformation = ({ navigation, route }) => {
  const { user, profilePictureUri } = route.params;
  useScreenArrowBack(navigation, PageNames.TRIP_INFORMATION);

  return (
    <Container>
      <View style={UserInformationStyles.userInformationWrapper}>
        <View style={UserInformationStyles.avatarContainer}>
          <Image
            source={
              profilePictureUri
                ? { uri: profilePictureUri }
                : require("../../../../assets/pictures/avatar.png")
            }
            style={UserInformationStyles.avatar}
          />
          <Text style={UserInformationStyles.userNameText}>
            {`${user.name} ${user.surname}`}
          </Text>
        </View>
        <View style={UserInformationStyles.highlightContainer}>
          <View>
            <Text style={UserInformationStyles.primaryText}>5</Text>
            <Text style={UserInformationStyles.secondaryText}>Kelionės</Text>
          </View>
          <TripPersonRating />
        </View>

        <View style={UserInformationStyles.detailsContainer}>
          <ListItem
            text={"Amžius"}
            secondaryText={calculateAge(user.dateOfBirth)}
            itemStyling={UserInformationStyles.listItem}
            icon={"calendar-outline"}
          />
          <ListItem
            text={"Lytis"}
            secondaryText={user.gender === "MALE" ? "Vyras" : "Moteris"}
            itemStyling={UserInformationStyles.listItem}
            icon={`${user.gender.toLowerCase()}-outline`}
          />
          <ListItem
            text={"Tel. numeris"}
            secondaryText={user.phoneNumber || "-"}
            itemStyling={UserInformationStyles.listItem}
            icon={"call-outline"}
          />
          <ListItem
            text={"Automobilis"}
            secondaryText={"Audi a4 2011, sedanas"}
            itemStyling={UserInformationStyles.listItem}
            icon={"car-outline"}
          />
        </View>
      </View>
      <Button
        text={"Siųsti pranešimą"}
        styling={UserInformationStyles.button}
      />
    </Container>
  );
};

export default UserInformation;
