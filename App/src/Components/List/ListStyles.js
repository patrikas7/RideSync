import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

export const ListItemStyles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 16,
  },
  textContainer: {
    marginLeft: 16,
  },
  listItemText: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    fontWeight: "500",
  },
  listItemTextFirst: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    fontWeight: "500",
    color: Colors.GREY_600,
  },
  listItemSecondaryText: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    fontWeight: "bold",
    marginTop: 6,
  },
  arrowIcon: {
    marginLeft: "auto",
  },
  touchableHighlight: {
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    padding: 8,
  },
});
