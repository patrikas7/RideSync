import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const ButtonSwitchStyles = StyleSheet.create({
  toggleContainer: {
    marginTop: 24,
    flexDirection: "row",
    borderColor: Colors.BLACK_100,
    borderWidth: 0.2,
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
  },
  toggleItem: {
    padding: 8,
    width: "50%",
    justifyContent: "center",
  },
  toggleItemLeft: {
    borderTopLeftRadius: Sizes.DEFAULT_BORDER_RADIUS,
    borderBottomLeftRadius: Sizes.DEFAULT_BORDER_RADIUS,
  },
  toggleItemRight: {
    borderTopRightRadius: Sizes.DEFAULT_BORDER_RADIUS,
    borderBottomRightRadius: Sizes.DEFAULT_BORDER_RADIUS,
  },
  toggleItemActive: {
    backgroundColor: Colors.BLUE_500,
  },
  toggleText: {
    textAlign: "center",
  },
  toggleTextActive: {
    color: Colors.WHITE,
  },
});

export default ButtonSwitchStyles;
