import { StyleSheet } from "react-native";
import StyleUtils from "../../Utils/styleUtils";
import Sizes from "../../Constants/sizes";

const styles = StyleSheet.create({
  bookmarkCard: { ...StyleUtils.card },
  bookmarkCardNotFirst: { marginTop: 16 },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  propertiesContainer: {
    marginTop: 16,
  },
  property: {
    alignItems: "center",
    flexDirection: "row",
  },
  propertyNotFirst: {
    marginTop: 8,
  },
  iconText: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    marginLeft: 8,
  },
  cardDetailsWrapper: {
    flexDirection: "row",
  },
  arrowIcon: {
    marginLeft: "auto",
    alignSelf: "center",
  },
  informationContainer: {
    flex: 1,
  },
  button: {
    marginBottom: 32,
  },
  bookmarkDetail: {
    paddingTop: 8,
  },
});

export default styles;
