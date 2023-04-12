import { TouchableHighlight, Image, Text, View } from "react-native";
import Colors from "../../Constants/colors";
import TripInformationStyles from "../TripInformationStyle";

const TripPersonProfile = ({ onPress, profilePictureUri, user }) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={Colors.WHITE}>
      <View style={TripInformationStyles.driverInformation}>
        <Image
          source={
            profilePictureUri
              ? { uri: profilePictureUri }
              : require("../../../assets/pictures/avatar.png")
          }
          style={TripInformationStyles.avatar}
        />
        <Text style={TripInformationStyles.driverName}>{`${
          user.name
        } ${user.surname.charAt(0)}.`}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default TripPersonProfile;
