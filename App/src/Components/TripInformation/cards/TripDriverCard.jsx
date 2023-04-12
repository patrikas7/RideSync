import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { generatePictureUri } from "../../../Utils/utils";
import TripInformationStyles from "../TripInformationStyle";
import TripPersonProfile from "../TripPersonProfile";
import TripPersonRating from "../TripPersonRating";
import Colors from "../../../Constants/colors";
import Sizes from "../../../Constants/sizes";
import IconButton from "../../Button/IconButton";
import PageNames from "../../../Constants/pageNames";

const TripDriverCard = ({ driver, isUserDriver, navigation, car }) => {
  const profilePictureUri = generatePictureUri(driver?.profilePicture);
  const handleOnChatPress = () => {
    navigation.navigate(PageNames.CHAT);
  };

  const handleOnProfilePress = () => {
    navigation.navigate(PageNames.USER_INFORMATION, {
      user: driver,
      profilePictureUri,
      isMyProfile: isUserDriver,
    });
  };

  return (
    <View
      style={[
        TripInformationStyles.infoCard,
        TripInformationStyles.notFirstChild,
        TripInformationStyles.driverCard,
      ]}
    >
      <View style={TripInformationStyles.driverCardLeft}>
        <TripPersonProfile
          onPress={handleOnProfilePress}
          profilePictureUri={profilePictureUri}
          user={driver}
        />
        <TripPersonRating />
      </View>
      <View>
        <View style={TripInformationStyles.vehicleDetails}>
          <Ionicons name="car" size={Sizes.ICON} />
          <View>
            <Text style={TripInformationStyles.primaryText}>
              {`${car?.manufacturer} ${car?.model} ${car?.manufactureYear} ${car?.type}`}
            </Text>
            <Text style={TripInformationStyles.secondaryText}>
              {car?.licensePlateNumber}
            </Text>
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
