import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableHighlight, View } from "react-native";
import TripInformationStyles from "./TripInformationStyle";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import IconButton from "../Button/IconButton";

const TripDriverCard = () => {
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
              source={require("../../../assets/pictures/avatar.png")}
              style={TripInformationStyles.avatar}
            />
            <Text style={TripInformationStyles.driverName}>Patrikas V.</Text>
          </View>
        </TouchableHighlight>
        <View style={TripInformationStyles.reviewContainer}>
          <Ionicons name="star" color={Colors.GOLD} size={Sizes.ICON_SMALL} />
          <Text style={TripInformationStyles.primaryText}>0</Text>
          <Text style={TripInformationStyles.reviewCount}>- 0 įvertinimų</Text>
        </View>
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
        <View style={TripInformationStyles.chatButton}>
          <IconButton
            name={"chatbox-outline"}
            size={38}
            onPress={handleOnChatPress}
          />
        </View>
      </View>
    </View>
  );
};

export default TripDriverCard;
