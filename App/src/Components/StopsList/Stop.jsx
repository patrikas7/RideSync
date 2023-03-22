import { View, Text, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StopsListStyle from "./StopsListStyle";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const Stop = ({ stop, onPress }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.6}
      underlayColor={Colors.WHITE}
    >
      <View style={StopsListStyle.stop}>
        <Ionicons
          name="stop-circle"
          color={Colors.BLUE_500}
          size={Sizes.ICON}
        />
        <View style={StopsListStyle.stopText}>
          <Text style={StopsListStyle.stopPrimaryText}>
            {stop.addressLine1}
          </Text>
          <Text style={StopsListStyle.stopSecondaryText}>
            {stop.addressLine2}
          </Text>
        </View>
        <Ionicons
          name="arrow-forward-outline"
          color={Colors.BLACK}
          size={Sizes.ICON}
          style={StopsListStyle.forwardIcon}
        />
      </View>
    </TouchableHighlight>
  );
};

export default Stop;
