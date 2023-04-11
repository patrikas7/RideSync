import { useState } from "react";
import { printError } from "../../../Utils/utils";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Button from "../../../Components/Button/Button";
import Container from "../../../Components/Container/Container";
import DateAndTimePicker from "../../../Components/TimeAndDatePicker/TimeAndDatePicker";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import { isAtLeastOneHourFromNow } from "../../Publish/PublishUtils";
import { showMessage } from "react-native-flash-message";
import ErrorMessages from "../../../Constants/errorMessages";
import axios from "axios";
import PageNames from "../../../Constants/pageNames";

const TripDateAndTimeEditScreen = ({ route, navigation }) => {
  const { prevScreen, trip, isReturn, token } = route.params;
  const [date, setDate] = useState(isReturn ? trip.returnDate : trip.date);
  const [time, setTime] = useState(isReturn ? trip.returnTime : trip.time);
  const [isLoading, setIsLoading] = useState(false);
  useScreenArrowBack(navigation, prevScreen);

  const handleOnPress = () => {
    if (!isReturn) validateUpdate();
  };

  const validateUpdate = () => {
    if (!isAtLeastOneHourFromNow(date, time)) {
      showMessage({
        message: ErrorMessages.AT_LEAST_ONE_HOUR_FROM_NOW,
        type: "danger",
        position: "top",
      });
      return;
    }

    updateTrip();
  };

  const updateTrip = async () => {
    setIsLoading(true);
    console.log(trip);
    try {
      const { data } = await axios.put(
        "/trips",
        {
          departure: trip.departure,
          destination: trip.destination,
          stops: trip.stops,
          date,
          time,
          personsCount: trip.personsCount,
          price: trip.price,
          comments: trip.comments,
          isTripFree: trip.isTripFree,
          isRoundTrip: trip.isRoundTrip,
          returnDate: trip.returnDate,
          returnTime: trip.returnTime,
          car: trip.car._id,
        },
        { params: { id: trip._id }, headers: { Authorization: token } }
      );

      showMessage({
        message: "Kelionė buvo sėkmingai atnaujinta",
        type: "success",
      });

      navigation.navigate(PageNames.TRIP_INFORMATION, { trip: data.trip });
    } catch (error) {
      printError(error);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <DateAndTimePicker
        date={date}
        handleOnDateChange={({ date, time }) => {
          setDate(date);
          setTime(time);
        }}
        headline={`Pasirinkite ${
          isReturn ? "grįžimo" : ""
        } kelionės datą ir laiką`}
      />
      <Button
        text={isReturn ? "Toliau" : "Išsaugoti"}
        styling={{ marginBottom: 32 }}
        onClick={handleOnPress}
      />
    </Container>
  );
};

export default TripDateAndTimeEditScreen;
