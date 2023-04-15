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

const InboxScreen = ({ token, id }) => {
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

  const handleOnNotificationPress = (notificationId, props) => {
    if (!props) {
      navigation.navigate(PageNames.NOTIFICATION_INFO, {
        notificationId,
      });

      return;
    }

    navigation.navigate(PageNames.CHAT, {
      prevScreen: PageNames.INBOX_LIST,
      token,
      ...props,
    });
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
          userId={id}
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
