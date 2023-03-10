import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const TextButton = ({ styling, onPress, align = "center" }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={Colors.WHITE}
      activeOpacity={0.6}
      style={{ alignItems: align, ...styling }}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name="add-outline" size={Sizes.ICON} color={Colors.BLUE} />
        <Text style={{ ...styles.text, textAlign: align }}>
          Pridėti sustojmą
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Colors.BLUE,
    fontSize: 16,
    marginLeft: 4,
  },
});
