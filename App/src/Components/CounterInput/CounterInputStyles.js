import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import StyleUtils from "../../Utils/styleUtils";

const CounterInputStyles = StyleSheet.create({
  counterInput: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 24,
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
    paddingVertical: 16,
    paddingHorizontal: 16,
    ...StyleUtils.shadow,
  },
  button: {
    padding: 6,
    borderRadius: 15,
  },
  activeButton: {
    backgroundColor: Colors.BLUE_500,
  },
  disabledButton: {
    backgroundColor: Colors.DISABLED,
  },
  value: {
    fontWeight: "bold",
    fontSize: 24,
    marginHorizontal: 32,
  },
});

export default CounterInputStyles;
