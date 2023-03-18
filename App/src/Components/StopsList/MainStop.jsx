import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import StopsListStyle from "./StopsListStyle";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const MainStop = ({
  stop,
  primaryTextStyling,
  secondaryTextStyling,
  color = Colors.BLUE_500,
  icon = "flag",
}) => {
  return (
    <View style={StopsListStyle.stop}>
      <Ionicons name={icon} color={color} size={Sizes.ICON} />
      <View style={StopsListStyle.stopText}>
        <Text style={[StopsListStyle.stopPrimaryText, primaryTextStyling]}>
          {stop.addressLine1}
        </Text>
        <Text style={[StopsListStyle.stopSecondaryText, secondaryTextStyling]}>
          {stop.addressLine2}
        </Text>
      </View>
    </View>
  );
};

export default MainStop;
