import { StyleSheet } from "react-native";
import Sizes from "../../Constants/sizes";

export const ListItemStyles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 16,
  },
  listItemText: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    marginLeft: 16,
    fontWeight: "500",
  },
  arrowIcon: {
    marginLeft: "auto",
  },
  touchableHighlight: {
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    padding: 8,
  },
});
