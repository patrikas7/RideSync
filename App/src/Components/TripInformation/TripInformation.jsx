import { ScrollView, View } from "react-native";
import TripInformationStyles from "./TripInformationStyle";
import TripRoutesCard from "./TripRoutesCard";
import TripDetailsCard from "./TripDetailsCard";
import TripDriverCard from "./TripDriverCard";
import Button from "../Button/Button";
import TextButton from "../Button/TextButton";
import { useState } from "react";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay/lib";
import PageNames from "../../Constants/pageNames";

const TripInformation = ({ trip, id, token, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleOnButtonClick = async () => {
    if (trip.isUserDriver) await deleteTrip();
    else
      navigation.navigate(PageNames.TRIP_PASSENGERS_COUNT_SELECT, {
        availableSeats: trip.personsCount,
      });
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
            name={trip.driver.name}
            surname={trip.driver.surname}
            isUserDriver={trip.isUserDriver}
          />

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
          text={trip.isUserDriver ? "Atšaukti kelionę" : "Rezervuoti vietą"}
          styling={TripInformationStyles.button}
          onClick={handleOnButtonClick}
        />
      </View>
    </View>
  );
};

export default TripInformation;
