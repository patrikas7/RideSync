import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { TextButtonStyles } from "./ButtonStyles";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const TextButton = ({ styling, text, onPress, icon, align = "center" }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={Colors.WHITE}
      activeOpacity={0.6}
      style={{ alignItems: align, ...styling }}
    >
      <View style={TextButtonStyles.buttonContainer}>
        <Ionicons name={icon} size={Sizes.ICON} color={Colors.BLUE} />
        <Text style={{ ...TextButtonStyles.text, textAlign: align }}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default TextButton;
