import { useState } from "react";
import { StyleSheet } from "react-native";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import DateAndTimePicker from "../../Components/TimeAndDatePicker/TimeAndDatePicker";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import { getFormatedTodaysDate } from "../../Utils/utils";

const SearchDateAndTimeScreen = ({ navigation, route }) => {
  const [tripDate, setTripDate] = useState(getFormatedTodaysDate());
  const { destination, departure, id, token } = route.params;
  useScreenArrowBack(navigation, PageNames.HOME);

  const handleOnNextPress = () => {
    navigation.navigate(PageNames.TRIPS, {
      destination: {
        city: destination,
      },
      departure: {
        city: departure,
      },
      date: tripDate,
      id,
      token,
    });
  };

  return (
    <Container>
      <DateAndTimePicker
        date={tripDate}
        handleOnDateChange={({ date }) => {
          if (date !== tripDate) setTripDate(date);
        }}
        mode={"calendar"}
      />

      <Button
        text={"Ieškoti"}
        styling={{ marginBottom: 32 }}
        onClick={handleOnNextPress}
      />
    </Container>
  );
};

export default SearchDateAndTimeScreen;

const styles = StyleSheet.create({});
