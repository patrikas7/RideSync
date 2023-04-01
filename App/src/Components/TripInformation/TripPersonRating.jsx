import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TripInformationStyles from "./TripInformationStyle";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const TripPersonRating = ({ styling }) => {
  return (
    <View style={[TripInformationStyles.reviewContainer, styling]}>
      <Ionicons name="star" color={Colors.GOLD} size={Sizes.ICON_SMALL} />
      <Text style={TripInformationStyles.primaryText}>0</Text>
      <Text style={TripInformationStyles.reviewCount}>- 0 įvertinimų</Text>
    </View>
  );
};

export default TripPersonRating;
