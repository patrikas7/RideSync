import { StyleSheet } from "react-native";
import Sizes from "../../Constants/sizes";

const SearchSuggestionStyles = StyleSheet.create({
  touchableHighlight: {
    padding: 8,
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    marginTop: 12,
  },
  result: {
    flexDirection: "row",
    alignItems: "center",
  },
  primaryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryText: {
    marginTop: 4,
  },
  resultIcon: {
    marginLeft: "auto",
  },
});

export default SearchSuggestionStyles;
