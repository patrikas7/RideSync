import { View, TouchableHighlight, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TripDetail from "./TripDetail";
import Colors from "../../../Constants/colors";
import Sizes from "../../../Constants/sizes";
import TripInformationStyles from "../TripInformationStyle";
import TripPersonRating from "../TripPersonRating";
import { generatePictureUri } from "../../../Utils/utils";

const PassengerInformation = ({ styling, onPress, passenger, seatsBooked }) => {
  const profilePictureUri = generatePictureUri(passenger.profilePicture);

  return (
    <TouchableHighlight
      style={[TripInformationStyles.passengerHighlight, styling]}
      onPress={() => onPress(profilePictureUri)}
      underlayColor={Colors.HIGHLIGHT_UNDERLAY}
      activeOpacity={0.8}
    >
      <View style={TripInformationStyles.passengerInfo}>
        <Image
          source={
            profilePictureUri
              ? { uri: profilePictureUri }
              : require("../../../../assets/pictures/avatar.png")
          }
          style={TripInformationStyles.avatar}
        />
        <View style={TripInformationStyles.passengerName}>
          <Text style={TripInformationStyles.driverName}>{`${
            passenger.name
          } ${passenger.surname.charAt(0)}.`}</Text>
          <TripPersonRating
            styling={TripInformationStyles.reviewContainerPassenger}
          />
        </View>
        <TripDetail
          size={"small"}
          styling={TripInformationStyles.passengersCount}
          icon={"people"}
          primaryText={seatsBooked}
          secondaryText={"Vietos"}
        />
        <Ionicons
          name="chevron-forward-outline"
          size={Sizes.ICON}
          color={Colors.GREY_600}
          style={TripInformationStyles.arrow}
        />
      </View>
    </TouchableHighlight>
  );
};

export default PassengerInformation;
