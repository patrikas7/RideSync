import { View, Image, Text, TouchableHighlight } from "react-native";
import { NotificationPreviewStyles } from "./NotificationStyles";
import { Ionicons } from "@expo/vector-icons";
import { getFormatedDateTime, generatePictureUri } from "../../Utils/utils";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";

const NotificationPreview = ({ notification, styling }) => {
  const profilePictureUri = generatePictureUri(
    notification.sender?.profilePicture
  );

  return (
    <TouchableHighlight
      onPress={() => console.log()}
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
            Pakeitimai būsimoje kelionėje!
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
