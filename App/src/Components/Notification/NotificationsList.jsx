import { Text, View } from "react-native";
import { NotificationsListStyles } from "./NotificationStyles";
import NotificationPreview from "./NotificationPreview";

const renderSection = (headline, notifications, onPress, styling) => {
  return (
    <>
      <Text style={[NotificationsListStyles.headline, styling]}>
        {headline}
      </Text>
      {notifications.map((notification, index) => (
        <NotificationPreview
          key={index}
          notification={notification}
          onPress={onPress}
          styling={index > 0 && NotificationsListStyles.notificationNotFirst}
        />
      ))}
    </>
  );
};

const NotificationsList = ({ notifications, onPress }) => {
  return (
    <View style={NotificationsListStyles.container}>
      {notifications.todaysNotifications.length > 0 &&
        renderSection("ŠIANDIEN", notifications.todaysNotifications, onPress)}
      {notifications.yesterdaysNotifications.length > 0 &&
        renderSection(
          "VAKAR",
          notifications.yesterdaysNotifications,
          onPress,
          NotificationsListStyles.headlineNotFirst
        )}
      {notifications.olderNotifications.length > 0 &&
        renderSection(
          "SENESNI PRANEŠIMAI",
          notifications.olderNotifications,
          onPress,
          NotificationsListStyles.headlineNotFirst
        )}
    </View>
  );
};

export default NotificationsList;
