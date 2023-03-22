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
  sliderSlot: {
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    borderColor: Colors.GREY_600,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    minWidth: 96,
  },
  sliderSlotNotFirst: {
    marginLeft: 8,
  },
  sliderSlotActive: {
    borderColor: Colors.BLUE_500,
    borderWidth: 2,
  },
  sliderSlotText: {
    color: Colors.GREY_600,
    textAlign: "center",
  },
  sliderSlotTextActive: {
    color: Colors.BLACK,
  },
});
