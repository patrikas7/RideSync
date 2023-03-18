import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import StyleUtils from "../../Utils/styleUtils";

const TripInformationStyles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  infoCard: {
    ...StyleUtils.card,
    paddingBottom: 0,
    paddingHorizontal: 0,
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
  },
  timeContainer: {
    marginTop: 16,
    backgroundColor: Colors.BLACK,
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
  comment: {
    fontWeight: "bold",
  },
  detailsCard: {
    paddingBottom: 16,
  },
});

export default TripInformationStyles;
