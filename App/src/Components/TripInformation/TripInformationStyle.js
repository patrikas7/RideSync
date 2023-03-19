import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import StyleUtils from "../../Utils/styleUtils";

const TripInformationStyles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    paddingBottom: 150,
  },
  inforamtionWrapper: {
    flex: 1,
  },
  scrollWrapper: {
    flex: 1,
    paddingBottom: 100,
  },
  infoCard: {
    ...StyleUtils.card,
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  driverCard: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    position: "relative",
  },
  driverCardLeft: {
    alignItems: "center",
  },
  driverInformation: {
    alignItems: "center",
  },
  routes: {
    paddingHorizontal: 16,
  },
  routeSecondaryText: {
    color: Colors.GREY_500,
    fontWeight: "bold",
  },
  separator: {
    ...StyleUtils.separator,
    borderLeftColor: Colors.BLUE_500,
  },
  timeContainer: {
    marginTop: 16,
    backgroundColor: Colors.BLUE_500,
    paddingVertical: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  time: {
    fontSize: 24,
    textAlign: "center",
    color: Colors.WHITE,
  },
  notFirstChild: {
    marginTop: 24,
  },
  detailsWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  infomrationPrimaryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infomrationPrimary: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    marginLeft: 4,
  },
  infomrationSecondary: {
    textAlign: "center",
    color: Colors.GREY_500,
    fontWeight: "bold",
    marginTop: 4,
  },
  commentsContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  detailsCard: {
    paddingBottom: 16,
  },
  avatar: {
    ...StyleUtils.avatar,
    width: 35,
    height: 35,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  primaryText: {
    marginLeft: 8,
    fontWeight: "bold",
  },
  reviewCount: {
    color: Colors.GREY_500,
  },
  driverName: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
  },
  vehicleDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondaryText: {
    marginLeft: 8,
    color: Colors.GREY_500,
  },
  chatButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  button: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
  },
});

export default TripInformationStyles;
