import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import StyleUtils from "../../Utils/styleUtils";

export const NotificationPreviewStyles = StyleSheet.create({
  avatar: { ...StyleUtils.avatar, width: 40, height: 40 },
  notification: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 16,
    maxWidth: "75%",
  },
  textPrimary: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    fontWeight: "bold",
  },
  textSecondary: {
    marginTop: 8,
    color: Colors.GREY_600,
    fontWeight: "500",
  },
  icon: {
    marginLeft: "auto",
    alignSelf: "top",
  },
  highlight: {
    paddingVertical: 16,
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
  },
});

export const NotificationsListStyles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  headline: StyleUtils.headline,
  headlineNotFirst: {
    marginTop: 16,
  },
  notificationNotFirst: {},
});
