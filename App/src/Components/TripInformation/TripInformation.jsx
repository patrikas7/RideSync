import { ScrollView, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useState } from "react";
import { alert } from "../../Utils/utils";
import { deleteBooking, deleteTrip } from "../../API/tripApi";
import {
  getActivePassengersCount,
  getButtonText,
} from "./tripInformationUtils";
import TripInformationStyles from "./TripInformationStyle";
import TripRoutesCard from "./cards/TripRoutesCard";
import TripDetailsCard from "./cards/TripDetailsCard";
import TripDriverCard from "./cards/TripDriverCard";
import Button from "../Button/Button";
import TextButton from "../Button/TextButton";
import Spinner from "react-native-loading-spinner-overlay/lib";
import PageNames from "../../Constants/pageNames";
import TripPassengersCard from "./cards/TripPassengersCard";

const TripInformation = ({
  trip,
  id,
  token,
  navigation,
  setTrip,
  userId,
  hasTripFinished,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isButtonVisible = !(
    trip.isUserDriver &&
    !getActivePassengersCount(trip.passengers) &&
    hasTripFinished
  );

  const handleOnButtonClick = async () => {
    if (trip.isUserDriver) {
      handleOnDelete();
      return;
    }

    if (trip.isUserRemovedFromTrip) {
      showMessage({
        message:
          "Rezervacija negalima, kadangi vairuotojas jus pašalino iš kelionės",
        type: "danger",
      });
      return;
    }

    if (trip.isUserPassenger) {
      cancelReservation();
      return;
    }

    navigation.navigate(PageNames.TRIP_PASSENGERS_COUNT_SELECT, {
      availableSeats: trip.personsCount,
      token,
      tripId: trip._id,
    });
  };

  const handleOnDelete = () => {
    alert(
      "Kelionės atšaukimas",
      "Ar tikrai norite atšaukti kelionę?",
      async () => {
        setIsLoading(true);
        await deleteTrip(token, id);
        setIsLoading(false);
        navigation.navigate(PageNames.TRIP_SEARCH_RESULTS);
      }
    );
  };

  const handleOnPassangerRemove = (passengerId) => {
    alert(
      "Ar tikrai norite pašalinti keleivį?",
      "Pašalinus keleivį jis daugiau negalės rezervuoti vietos šioje kelionėje",
      () => cancelReservation(passengerId)
    );
  };

  const cancelReservation = async (passengerId) => {
    setIsLoading(true);
    const { trip } = await deleteBooking(trip._id, passengerId, token);
    if (trip) {
      showMessage({
        message: "Rezervacija buvo sėkmingai atšaukta",
        type: "success",
      });

      setTrip(data.trip);
    }
    setIsLoading(false);
  };

  const handleOnChatPress = (id, profilePictureUri, name, surname) => {
    navigation.navigate(PageNames.CHAT, {
      prevScreen: PageNames.TRIP_INFORMATION,
      token,
      profilePictureUri,
      receiver: id,
      receiverName: `${name} ${surname}`,
    });
  };

  return (
    <View style={TripInformationStyles.inforamtionWrapper}>
      <Spinner visible={isLoading} />
      <View style={TripInformationStyles.scrollWrapper}>
        <ScrollView style={TripInformationStyles.container}>
          <TripRoutesCard
            departure={trip.departure}
            destination={trip.destination}
            time={trip.time}
            stops={trip.stops}
          />
          <TripDetailsCard
            personsCount={trip.personsCount}
            price={trip.price}
            comments={trip.comments}
          />
          <TripDriverCard
            driver={trip.driver}
            car={trip?.car}
            isUserDriver={trip.isUserDriver}
            navigation={navigation}
            onChat={handleOnChatPress}
          />

          {getActivePassengersCount(trip.passengers) > 0 && (
            <TripPassengersCard
              passengers={trip.passengers}
              navigation={navigation}
              userId={userId}
              isUserDriver={trip.isUserDriver}
              onPassangerRemove={handleOnPassangerRemove}
              onChat={handleOnChatPress}
            />
          )}

          {!trip.isUserDriver && (
            <TextButton
              text={"Pranešti apie kelionę"}
              onPress={() => console.log()}
              styling={{ marginTop: 32 }}
              icon={"alert-outline"}
            />
          )}
        </ScrollView>

        {isButtonVisible && (
          <Button
            text={getButtonText(
              trip.isUserDriver,
              trip.isUserPassenger,
              trip.isUserRemovedFromTrip,
              hasTripFinished
            )}
            styling={TripInformationStyles.button}
            disabled={trip.isUserRemovedFromTrip}
            onClick={handleOnButtonClick}
          />
        )}
      </View>
    </View>
  );
};

export default TripInformation;
