import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const StopsListStyle = StyleSheet.create({
  stop: {
    flexDirection: "row",
    alignItems: "center",
  },
  stopText: {
    marginLeft: 12,
  },
  stopPrimaryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stopSecondaryText: {
    marginTop: 4,
  },
  separator: {
    borderLeftColor: Colors.BLUE_500,
    borderLeftWidth: 2,
    height: 20,
    marginLeft: 10,
  },
  forwardIcon: {
    marginLeft: "auto",
  },
});

export default StopsListStyle;
