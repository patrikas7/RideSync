import { View } from "react-native";
import { useState } from "react";
import Container from "../../../Components/Container/Container";
import Header from "../../../Components/Form/Header";
import PageNames from "../../../Constants/pageNames";
import Sizes from "../../../Constants/sizes";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import CounterInput from "../../../Components/CounterInput/CounterInput";
import Button from "../../../Components/Button/Button";

const TripPassengersCount = ({ navigation, route }) => {
  const [passengersCount, setPassengersCount] = useState(1);
  const { availableSeats } = route.params;
  useScreenArrowBack(navigation, PageNames.TRIP_INFORMATION);

  const handleOnPress = async () => {
    console.log(passengersCount);
  };

  return (
    <Container>
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
