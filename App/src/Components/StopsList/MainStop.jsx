import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import StopsListStyle from "./StopsListStyle";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const MainStop = ({ stop }) => {
  return (
    <View style={StopsListStyle.stop}>
      <Ionicons name="flag" color={Colors.BLUE_500} size={Sizes.ICON} />
      <View style={StopsListStyle.stopText}>
        <Text style={StopsListStyle.stopPrimaryText}>{stop.addressLine1}</Text>
        <Text style={StopsListStyle.stopSecondaryText}>
          {stop.addressLine2}
        </Text>
      </View>
    </View>
  );
};

export default MainStop;
