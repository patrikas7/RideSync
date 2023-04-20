import { View, Image, Text, TouchableHighlight } from "react-native";
import { NotificationPreviewStyles } from "./NotificationStyles";
import { Ionicons } from "@expo/vector-icons";
import { getFormatedDateTime, generatePictureUri } from "../../Utils/utils";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";
import {
  getNotificationHeadline,
  parseChatNotificationData,
} from "../../Views/Inbox/inboxUtils";

const NotificationPreview = ({ notification, styling, onPress, userId }) => {
  const isNotification = !!notification.notificationType;
  const chatNotificationData = parseChatNotificationData(notification, userId);
  const profilePictureUri = isNotification
    ? generatePictureUri(notification.sender?.profilePicture)
    : chatNotificationData.profilePictureUri;

  const handleOnPress = () => {
    if (isNotification) {
      onPress(notification._id);
      return;
    }

    onPress(notification._id, {
      receiver: chatNotificationData.receiver._id,
      profilePictureUri: chatNotificationData.profilePictureUri,
      receiverName: chatNotificationData.receiver.name,
    });
  };

  return (
    <TouchableHighlight
      onPress={handleOnPress}
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
            {isNotification
              ? getNotificationHeadline(notification.notificationType)
              : chatNotificationData.text}
          </Text>
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
