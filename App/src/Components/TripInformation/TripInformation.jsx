import { ScrollView, View, Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import TripInformationStyles from "./TripInformationStyle";
import TripRoutesCard from "./cards/TripRoutesCard";
import TripDetailsCard from "./cards/TripDetailsCard";
import TripDriverCard from "./cards/TripDriverCard";
import Button from "../Button/Button";
import TextButton from "../Button/TextButton";
import { useState } from "react";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay/lib";
import PageNames from "../../Constants/pageNames";
import TripPassengersCard from "./cards/TripPassengersCard";
import { alert } from "../../Utils/utils";

const TripInformation = ({ trip, id, token, navigation, setTrip, userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnButtonClick = async () => {
    if (trip.isUserDriver) handleOnDelete();
    else if (trip.isUserPassenger) cancelReservation();
    else
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
      deleteTrip
    );
  };

  const handleOnPassangerRemove = (passengerId) => {
    alert("Keleivio šalinimas", "Ar tikrai norite pašalinti keleivį?", () =>
      cancelReservation(passengerId)
    );
  };

  const deleteTrip = async () => {
    setIsLoading(true);
    try {
      await axios.delete("/trips/information", {
        params: { id },
        headers: { Authorization: token },
      });

      navigation.navigate(PageNames.TRIP_SEARCH_RESULTS);
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelReservation = async (passengerId) => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete("/trips/bookings", {
        params: { id: trip._id, passengerId },
        headers: { Authorization: token },
      });

      showMessage({
        message: "Rezervacija buvo sėkmingai atšaukta",
        type: "success",
      });

      setTrip(data.trip);
    } catch (error) {
      if (error.response) console.error(error.response.data);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (trip.isUserDriver) return "Atšaukti kelionę";
    if (trip.isUserPassenger) return "Atšaukti rezervaciją";
    return "Rezervuoti vietą";
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

          {trip?.passengers?.length > 0 && (
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

        <Button
          text={getButtonText()}
          styling={TripInformationStyles.button}
          onClick={handleOnButtonClick}
        />
      </View>
    </View>
  );
};

export default TripInformation;
