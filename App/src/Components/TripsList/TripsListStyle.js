import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import StyleUtils from "../../Utils/styleUtils";

const TripsListStyle = StyleSheet.create({
  touchableHighlight: {
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    overflow: "hidden",
  },
  cardContainer: {
    ...StyleUtils.card,
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  wrapper: {
    paddingHorizontal: 16,
  },
  cardInformationWrapper: {
    flexDirection: "row",
  },
  tripsContainer: {
    marginTop: 24,
  },
  time: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  date: {
    marginTop: 8,
    textAlign: "center",
  },
  cardLeft: {
    borderColor: Colors.WHITE,
    borderRightColor: Colors.GREY,
    borderWidth: 1,
    paddingRight: 24,
    justifyContent: "center",
  },
  cardRight: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 24,
  },
  stops: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  stopText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  arrowIcon: {
    marginHorizontal: 12,
  },
  driverInformation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  driverInformationNoTime: {
    paddingBottom: 16,
  },
  avatar: { ...StyleUtils.avatar },
  driverName: {
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 18,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  infomrationPrimary: {
    marginLeft: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  infomrationSecondary: {
    textAlign: "center",
  },
  reviewContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 8,
  },
  review: {
    marginLeft: 8,
    fontWeight: "bold",
  },
  reviewCount: {
    color: Colors.GREY_500,
  },
  notFirstItem: {
    marginTop: 16,
  },
  remainingTimeContainer: {
    marginTop: 16,
    backgroundColor: Colors.WARNING_YELLOW,
    paddingVertical: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  remainingTimeText: {
    fontSize: 22,
    textAlign: "center",
    color: Colors.WHITE,
  },
});

export default TripsListStyle;
