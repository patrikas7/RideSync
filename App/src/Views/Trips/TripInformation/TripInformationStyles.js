import { StyleSheet } from "react-native";
import Colors from "../../../Constants/colors";
import Sizes from "../../../Constants/sizes";
import StyleUtils from "../../../Utils/styleUtils";

export const UserInformationStyles = StyleSheet.create({
  userInformationWrapper: {
    flex: 1,
  },
  avatarContainer: {
    marginTop: 32,
  },
  avatar: {
    ...StyleUtils.avatar,
    width: 110,
    height: 110,
    alignSelf: "center",
    borderRadius: 55,
  },
  userNameText: {
    textAlign: "center",
    marginTop: 12,
    fontWeight: "bold",
    fontSize: 20,
  },
  highlightContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopColor: Colors.GREY_600,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 12,
  },
  primaryText: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    textAlign: "center",
    fontWeight: "bold",
  },
  secondaryText: {
    color: Colors.GREY_600,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
  },
  detailsContainer: {
    marginTop: 12,
  },
  listItem: {
    paddingVertical: 8,
  },
  button: {
    marginBottom: 32,
  },
});

export const TripEditStyles = StyleSheet.create({
  headline: {
    color: Colors.GREY_600,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    fontWeight: "bold",
    marginTop: 8,
  },
  headlineNotFirst: {
    marginTop: 16,
  },
});
