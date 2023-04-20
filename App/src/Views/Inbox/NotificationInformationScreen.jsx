import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { fetchNotificationData } from "../../API/notificationApi";
import { NotificationTypes } from "../../Constants/types";
import { getFormatedDateTime } from "../../Utils/utils";
import { getHeadlineText } from "./inboxUtils";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import styles from "./InboxStyles";
import TripRoutesCard from "../../Components/TripInformation/cards/TripRoutesCard";
import Button from "../../Components/Button/Button";
import { Rating } from "react-native-ratings";

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
      {!notification ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationHeadline}>
              {getHeadlineText(notification.notificationType)}
            </Text>
            <Text style={styles.notificationDate}>
              {getFormatedDateTime(notification.createdAt)}
            </Text>
            <TripRoutesCard
              departure={notification.trip.departure}
              destination={notification.trip.destination}
              time={notification.trip.time}
              stops={notification.stops}
            />

            {notification.rating && (
              <>
                <Text style={styles.reviewHeadline}>
                  Jusų kelionės įvertinimas:
                </Text>

                <Rating
                  readonly={true}
                  startingValue={notification.rating}
                  style={styles.review}
                />
              </>
            )}
          </View>
          {notification.notificationType ===
            NotificationTypes.TRIP_WAS_EDITED && (
            <Button
              text={"Kelionės informacija"}
              styling={styles.button}
              onClick={handleOnPress}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default NotificationInformationScreen;
