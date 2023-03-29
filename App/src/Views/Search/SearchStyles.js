import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const SearchStyles = StyleSheet.create({
  screenContainer: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  subHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    justifyContent: "space-between",
  },
  historyContainer: {
    marginTop: 36,
  },
  citySearchContainer: {
    marginTop: 4,
    paddingHorizontal: Sizes.DEFAULT_HORIZONTAL_PADDING,
    flex: 1,
  },
  citySearchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  citySearchIcon: {
    marginBottom: 12,
  },
  citySearchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
  },
  citySearchPillsContainer: {
    marginTop: 16,
  },
  resultsContainer: {
    marginTop: 12,
  },
});

export default SearchStyles;
