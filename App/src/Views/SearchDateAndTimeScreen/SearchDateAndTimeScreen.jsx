import { useState } from "react";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { getFormatedDate } from "react-native-modern-datepicker";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import DateAndTimePicker from "../../Components/TimeAndDatePicker/TimeAndDatePicker";
import ErrorMessages from "../../Constants/errorMessages";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import { isTimeLaterOrEqual } from "../../Utils/utils";

const SearchDateAndTimeScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("");
  useScreenArrowBack(navigation, PageNames.HOME);

  const handleOnNextPress = () => {
    if (!isTimeLaterOrEqual(dateAndTime.time)) {
      showMessage({
        message: ErrorMessages.SEARCH_TIME_ERROR,
        type: "danger",
      });

      return;
    }
  };

  return (
    <Container>
      <DateAndTimePicker handleOnDateChange={setSelectedDate} />

      <Button
        text={"Toliau"}
        styling={{ marginBottom: 32 }}
        onClick={handleOnNextPress}
      />
    </Container>
  );
};

export default SearchDateAndTimeScreen;

const styles = StyleSheet.create({});
