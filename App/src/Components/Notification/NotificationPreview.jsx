import { View, Image, Text, TouchableHighlight } from "react-native";
import { NotificationPreviewStyles } from "./NotificationStyles";
import { Ionicons } from "@expo/vector-icons";
import { getFormatedDateTime, generatePictureUri } from "../../Utils/utils";
import { NotificationTypes } from "../../Constants/notifications";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";

const NotificationPreview = ({ notification, styling, onPress }) => {
  const profilePictureUri = generatePictureUri(
    notification.sender?.profilePicture
  );

  const getNotificationHeadline = () => {
    if (notification.notificationType === NotificationTypes.TRIP_WAS_EDITED)
      return "Pakeitimai būsimoje kelionėje!";

    if (notification.notificationType === NotificationTypes.TRIP_WAS_CANCELED)
      return "Jūsų būsima kelionė buvo atšaukta!";

    if (
      notification.notificationType ===
      NotificationTypes.I_WAS_REMOVED_FROM_TRIP
    )
      return "Kelionės vairuotojas atšaukė jūsų rezervaciją!";
  };

  return (
    <TouchableHighlight
      onPress={() => onPress(notification._id, notification.notificationType)}
      underlayColor={Colors.HIGHLIGHT_UNDERLAY}
      activeOpacity={0.8}
      style={NotificationPreviewStyles.highlight}
    >
      <View style={[NotificationPreviewStyles.notification, styling]}>
        <Image
          source={
            profilePictureUri
              ? { uri: profilePictureUri }
              : require("../../../assets/pictures/avatar.png")
          }
          style={NotificationPreviewStyles.avatar}
        />
        <View style={NotificationPreviewStyles.textContainer}>
          <Text style={NotificationPreviewStyles.textPrimary}>
            {getNotificationHeadline()}
          </Text>
          <Text style={NotificationPreviewStyles.textSecondary}>
            {getFormatedDateTime(notification.createdAt)}
          </Text>
        </View>
        {!notification.isRead && (
          <Ionicons
            name="ellipse"
            size={Sizes.ICON_NOTIFICATION}
            color={Colors.BLUE_500}
            style={NotificationPreviewStyles.icon}
          />
        )}
      </View>
    </TouchableHighlight>
  );
};

export default NotificationPreview;
