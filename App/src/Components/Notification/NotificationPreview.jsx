import { View, Image, Text, TouchableHighlight } from "react-native";
import { NotificationPreviewStyles } from "./NotificationStyles";
import { Ionicons } from "@expo/vector-icons";
import { getFormatedDateTime, generatePictureUri } from "../../Utils/utils";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";
import {
  getNotificationHeadline,
  getChatNotificationHeadlne,
} from "../../Views/Inbox/inboxUtils";

const NotificationPreview = ({ notification, styling, onPress, userId }) => {
  const isNotification = !!notification.notificationType;
  const profilePictureUri = isNotification
    ? generatePictureUri(notification.sender?.profilePicture)
    : getChatNotificationHeadlne(notification, userId).profilePicture;

  let text;
  if (isNotification) {
    text = getNotificationHeadline(notification.notificationType);
  } else {
    text = getChatNotificationHeadlne(notification, userId).text;
  }

  return (
    <TouchableHighlight
      onPress={() => onPress(notification._id)}
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
          <Text style={NotificationPreviewStyles.textPrimary}>{text}</Text>
          <Text style={NotificationPreviewStyles.textSecondary}>
            {getFormatedDateTime(
              isNotification
                ? notification.createdAt
                : notification.messages[0].createdAt
            )}
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
