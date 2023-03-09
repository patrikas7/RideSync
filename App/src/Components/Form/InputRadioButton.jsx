import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../../Constants/colors";

const InputRadioButton = ({
  value,
  isChecked,
  onPress,
  containerStyling,
  color = Colors.BLACK,
}) => {
  return (
    <View style={containerStyling}>
      <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
        <View style={styles.iconContainer}>
          {isChecked && (
            <Ionicons name="checkmark-outline" color={color} size={24} />
          )}
        </View>
        <Text style={{ ...styles.radioButtonText, color }}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputRadioButton;

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
});
