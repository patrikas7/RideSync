import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Colors from "../../Constants/colors";
import { IconButtonSyles } from "./ButtonStyles";

const IconButton = ({
  name,
  onPress,
  size = 32,
  backgroundColor = Colors.BLACK,
  iconColor = Colors.WHITE,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor,
        width: size,
        height: size,
        borderRadius: size / 2,
        ...IconButtonSyles.iconButton,
      }}
      activeOpacity={0.6}
    >
      <Ionicons name={name} color={iconColor} size={size / 2} />
    </TouchableOpacity>
  );
};

export default IconButton;
