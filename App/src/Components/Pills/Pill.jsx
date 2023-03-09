import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import PillsStyles from "./PillsStyles";

const Pill = ({ text, onPress, icon = "time-outline" }) => {
  return (
    <TouchableOpacity activeOpacity="0.7" onPress={onPress}>
      <View style={PillsStyles.pill}>
        <Ionicons name={icon} color={Colors.BLUE_500} size={Sizes.ICON_SMALL} />
        <Text style={PillsStyles.pillText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Pill;
