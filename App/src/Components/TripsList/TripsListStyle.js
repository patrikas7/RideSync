import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const TripsListStyle = StyleSheet.create({
  touchableHighlight: {
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    overflow: "hidden",
  },
  cardContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    borderColor: Colors.GREY,
    borderWidth: 1,
    padding: 16,
    shadowColor: Colors.MIDNIGHT_BLACK,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  },
  date: {
    marginTop: 8,
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
  avatar: {
    width: 30,
    height: 30,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    borderRadius: 50,
  },
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
});

export default TripsListStyle;
