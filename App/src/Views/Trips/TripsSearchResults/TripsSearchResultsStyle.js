import { StyleSheet } from "react-native";
import Colors from "../../../Constants/colors";
import Sizes from "../../../Constants/sizes";

export const TripFiltersStyles = StyleSheet.create({
  filtersWrapper: {
    flex: 1,
  },
  button: {
    marginBottom: 32,
  },
  addToFavorites: {
    flexDirection: "row",
    alignItems: "center",
  },
  addToFavoritesText: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    marginLeft: 8,
  },
  filtersSection: {
    borderBottomColor: Colors.GREY_600,
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  filtersSectionNotFirst: {
    paddingTop: 24,
  },
  headline: {
    color: Colors.GREY_600,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    fontWeight: "bold",
  },
  timeSlot: {
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    borderColor: Colors.GREY_600,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  timeSlotNotFirst: {
    marginLeft: 8,
  },
  timeSlotActive: {
    borderColor: Colors.BLUE_500,
    borderWidth: 2,
  },
  timeSlotText: {
    color: Colors.GREY_600,
  },
  timeSlotTextActive: {
    color: Colors.BLACK,
  },
});
