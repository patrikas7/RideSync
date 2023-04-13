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
  const { prevScreen, trip, isReturn, token, isTripSearchRequest } =
    route.params;
  const [date, setDate] = useState(isReturn ? trip.returnDate : trip.date);
  const [time, setTime] = useState(isReturn ? trip.returnTime : trip.time);
  const [isLoading, setIsLoading] = useState(false);
  useScreenArrowBack(navigation, prevScreen, route.params);

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

    updateData();
  };

  const updateData = async () => {
    setIsLoading(true);
    try {
      isTripSearchRequest
        ? await updateTripSearchRequest()
        : await updateTrip();
    } catch (error) {
      printError(error);
    }

    setIsLoading(false);
  };

  const updateTrip = async () => {
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
  };

  const updateTripSearchRequest = async () => {
    const { data } = await axios.put(
      `/trip-search-requests/${trip._id}`,
      {
        departure: trip.departure,
        destination: trip.destination,
        date: trip.date,
        time: trip.time,
        passengersCount: trip.passengersCount,
        comments: trip.passengersCount,
      },
      { headers: { Authorization: token } }
    );

    showMessage({
      message: "Kelionės paieškos užklausa buvo sėkmingai atnaujinta",
      type: "success",
    });

    navigation.navigate(PageNames.TRIP_SEARCH_REQUEST_INFORMATION, {
      tripSearchRequest: data.tripSearchRequest,
    });
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
