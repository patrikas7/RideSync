import { useState } from "react";
import { StyleSheet } from "react-native";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import DateAndTimePicker from "../../Components/TimeAndDatePicker/TimeAndDatePicker";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";

const SearchDateAndTimeScreen = ({ navigation }) => {
  const [dateAndTime, setDateAndTime] = useState({ date: "", time: "" });
  useScreenArrowBack(navigation, PageNames.HOME);

  return (
    <Container>
      <DateAndTimePicker
        handleOnDateChange={({ props }) => setDateAndTime({ ...props })}
        date={dateAndTime.date}
      />

      <Button text={"Toliau"} styling={{ marginBottom: 32 }} />
    </Container>
  );
};

export default SearchDateAndTimeScreen;

const styles = StyleSheet.create({});
