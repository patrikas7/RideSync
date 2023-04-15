import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { fetchNotificationData } from "../../API/notificationApi";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import styles from "./InboxStyles";
import TripRoutesCard from "../../Components/TripInformation/cards/TripRoutesCard";
import Button from "../../Components/Button/Button";

const NotificationInformationScreen = ({ token, tabsNavigation }) => {
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { notificationId } = route.params;
  useScreenArrowBack(navigation, PageNames.INBOX_LIST);

  useEffect(() => {
    if (!token || !notificationId) return;
    const fetchNotifications = async () => {
      setIsLoading(true);
      const { notification } = await fetchNotificationData(
        notificationId,
        token
      );
      setNotification(notification);
      setIsLoading(false);
    };

    fetchNotifications();
  }, [token, notificationId]);

  const handleOnPress = () => {
    tabsNavigation.navigate(PageNames.MY_RIDES, {
      screen: PageNames.TRIP_INFORMATION,
      params: { id: notification.trip._id },
    });
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationHeadline}>
          Dėmesio, kelionės vairuotojas atliko pakeitimus susisjusius su
          kelionės informacija!
        </Text>
        <Text style={styles.notificationDate}>2023-04-04 17:00</Text>
        <TripRoutesCard
          departure={notification.trip.departure}
          destination={notification.trip.destination}
          time={notification.trip.time}
          stops={notification.stops}
        />
      </View>
      <Button
        text={"Kelionės informacija"}
        styling={styles.button}
        onClick={handleOnPress}
      />
    </Container>
  );
};

export default NotificationInformationScreen;
