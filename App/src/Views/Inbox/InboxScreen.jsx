import { useState, useEffect } from "react";
import { View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { printError } from "../../Utils/utils";
import { fetchNotificationsData } from "../../API/notificationApi";
import axios from "axios";
import Container from "../../Components/Container/Container";
import Spinner from "react-native-loading-spinner-overlay/lib";
import NoResults from "../../Components/NoResults/NoResults";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import NotificationsList from "../../Components/Notification/NotificationsList";
import PageNames from "../../Constants/pageNames";
import { NotificationTypes } from "../../Constants/notifications";

const InboxScreen = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({});
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (!token || !isFocused) return;
    const fetchNotifications = async () => {
      setIsLoading(true);
      const { data } = await fetchNotificationsData(token);

      setNotifications(data);
      setIsLoading(false);
    };

    fetchNotifications();
  }, [token, isFocused]);

  const handleOnNotificationPress = (notificationId, notificationType) => {
    if (notificationType === NotificationTypes.TRIP_WAS_EDITED) {
      navigation.navigate(PageNames.TRIP_WAS_EDITED_NOTIFICATION, {
        notificationId,
      });
      return;
    }
  };

  const renderContent = () =>
    !notifications?.resultsCount ? (
      <NoResults
        primaryText="Jus pranešimų dėžutė yra tuščia!"
        secondaryText={"Jus neturite jokių gautu pranešimų"}
        buttonText={"Į kelionių paiešką"}
      />
    ) : (
      <View>
        <Header text={"Pranešimai"} size={Sizes.HEADER_MEDIUM} />
        <NotificationsList
          notifications={notifications}
          onPress={handleOnNotificationPress}
        />
      </View>
    );

  return (
    <Container>
      {isLoading ? <Spinner visible={isLoading} /> : renderContent()}
    </Container>
  );
};

export default InboxScreen;
