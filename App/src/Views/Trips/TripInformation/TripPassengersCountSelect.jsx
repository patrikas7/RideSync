import { View } from "react-native";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import Container from "../../../Components/Container/Container";
import Header from "../../../Components/Form/Header";
import PageNames from "../../../Constants/pageNames";
import Sizes from "../../../Constants/sizes";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import CounterInput from "../../../Components/CounterInput/CounterInput";
import Button from "../../../Components/Button/Button";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";

const TripPassengersCount = ({ navigation, route }) => {
  const [passengersCount, setPassengersCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { availableSeats, token, tripId } = route.params;
  useScreenArrowBack(navigation, PageNames.TRIP_INFORMATION);

  const handleOnPress = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "/trips/bookings",
        { passengersCount, tripId },
        { headers: { Authorization: token } }
      );
      showMessage({
        message: "Vieta į kelionę buvo sėkmingai rezetvuota!",
        type: "success",
      });

      navigation.navigate(PageNames.TRIP_INFORMATION, { trip: data.trip });
    } catch (error) {
      console.error(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <View style={{ flex: 1 }}>
        <Header
          text="Pasirinkite keleivių skaičių"
          size={Sizes.HEADER_MEDIUM}
          containerStyling={{ alignSelf: "center" }}
        />
        <CounterInput
          initialValue={passengersCount}
          onChange={setPassengersCount}
          valueRange={[1, availableSeats]}
        />
      </View>

      <Button
        text={"Rezervuoti vietą"}
        styling={{ marginBottom: 32 }}
        onClick={handleOnPress}
      />
    </Container>
  );
};

export default TripPassengersCount;
