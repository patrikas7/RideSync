import { View, TouchableHighlight, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TripDetail from "./TripDetail";
import Colors from "../../../Constants/colors";
import TripInformationStyles from "../TripInformationStyle";
import TripPersonRating from "../TripPersonRating";
import { generatePictureUri } from "../../../Utils/utils";
import IconButton from "../../Button/IconButton";

const PassengerInformation = ({
  styling,
  onPress,
  passenger,
  seatsBooked,
  isUserDriver,
  onPassangerRemove,
}) => {
  const profilePictureUri = generatePictureUri(passenger.profilePicture);

  return (
    <View style={[TripInformationStyles.passengerHighlight, styling]}>
      <View>
        <View style={TripInformationStyles.passengerInfo}>
          <TouchableHighlight
            onPress={() => onPress(profilePictureUri)}
            underlayColor={Colors.WHITE}
            activeOpacity={0.8}
          >
            <Image
              source={
                profilePictureUri
                  ? { uri: profilePictureUri }
                  : require("../../../../assets/pictures/avatar.png")
              }
              style={TripInformationStyles.avatar}
            />
          </TouchableHighlight>

          <View style={TripInformationStyles.passengerName}>
            <Text style={TripInformationStyles.driverName}>{`${
              passenger.name
            } ${passenger.surname.charAt(0)}.`}</Text>
            <TripPersonRating
              styling={TripInformationStyles.reviewContainerPassenger}
            />
          </View>
        </View>
      </View>

      <View style={TripInformationStyles.passengersCount}>
        <TripDetail
          size={"small"}
          icon={"people"}
          primaryText={seatsBooked}
          secondaryText={"Vietos"}
        />
        {isUserDriver && (
          <View style={TripInformationStyles.passengerIcons}>
            <IconButton
              name={"chatbox-outline"}
              size={38}
              backgroundColor={Colors.BLUE_500}
            />

            <IconButton
              name={"person-remove-outline"}
              size={38}
              backgroundColor={Colors.BLUE_500}
              styles={TripInformationStyles.removeIcon}
              onPress={() => onPassangerRemove(passenger._id)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default PassengerInformation;
