import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const PillsStyles = StyleSheet.create({
  pillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.BLUE_500_TRANSPARENT,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 8,
    marginTop: 8,
  },
  pillText: {
    color: Colors.BLUE_500,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    fontWeight: "500",
    marginLeft: 4,
  },
});

export default PillsStyles;
