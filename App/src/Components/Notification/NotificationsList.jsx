import { Text, View } from "react-native";
import { NotificationsListStyles } from "./NotificationStyles";
import NotificationPreview from "./NotificationPreview";

const renderSection = (headline, notifications, styling) => {
  return (
    <>
      <Text style={[NotificationsListStyles.headline, styling]}>
        {headline}
      </Text>
      {notifications.map((notification, index) => (
        <NotificationPreview
          key={index}
          notification={notification}
          styling={index > 0 && NotificationsListStyles.notificationNotFirst}
        />
      ))}
    </>
  );
};

const NotificationsList = ({ notifications }) => {
  return (
    <View style={NotificationsListStyles.container}>
      {notifications.todaysNotifications.length > 0 &&
        renderSection("ŠIANDIEN", notifications.todaysNotifications)}
      {notifications.yesterdaysNotifications.length > 0 &&
        renderSection(
          "VAKAR",
          notifications.yesterdaysNotifications,
          NotificationsListStyles.headlineNotFirst
        )}
      {notifications.olderNotifications.length > 0 &&
        renderSection(
          "SENESNI PRANEŠIMAI",
          notifications.olderNotifications,
          NotificationsListStyles.headlineNotFirst
        )}
    </View>
  );
};

export default NotificationsList;
