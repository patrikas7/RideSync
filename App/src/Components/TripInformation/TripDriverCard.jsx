import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { generatePictureUri } from "../../Utils/utils";
import TripInformationStyles from "./TripInformationStyle";
import TripPersonRating from "./TripPersonRating";

import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import IconButton from "../Button/IconButton";

const TripDriverCard = ({ driver, isUserDriver }) => {
  const profilePictureUri = generatePictureUri(driver.profilePicture);
  const handleOnChatPress = () => {};

  const handleOnProfilePress = () => {};

  return (
    <View
      style={[
        TripInformationStyles.infoCard,
        TripInformationStyles.notFirstChild,
        TripInformationStyles.driverCard,
      ]}
    >
      <View style={TripInformationStyles.driverCardLeft}>
        <TouchableHighlight
          onPress={handleOnProfilePress}
          underlayColor={Colors.WHITE}
        >
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
              driver.name
            } ${driver.surname.charAt(0)}.`}</Text>
          </View>
        </TouchableHighlight>
        <TripPersonRating />
      </View>
      <View>
        <View style={TripInformationStyles.vehicleDetails}>
          <Ionicons name="car" size={Sizes.ICON} />
          <View>
            <Text style={TripInformationStyles.primaryText}>
              Audi a4 2011 sedanas
            </Text>
            <Text style={TripInformationStyles.secondaryText}>MGD 331</Text>
          </View>
        </View>
        {!isUserDriver && (
          <View style={TripInformationStyles.chatButton}>
            <IconButton
              name={"chatbox-outline"}
              size={38}
              onPress={handleOnChatPress}
              backgroundColor={Colors.BLUE_500}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default TripDriverCard;
