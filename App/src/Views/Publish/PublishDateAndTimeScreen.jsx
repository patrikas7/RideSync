import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import DatePicker from "react-native-modern-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { setDate, setReturnDate } from "../../redux/publish/publishSlice";
import PublishStyles from "./PublishStyles";
import Colors from "../../Constants/colors";
import { getFormatedTodaysDate } from "../../Utils/utils";
import Button from "../../Components/Button/Button";

const PublishDateAndTimeScreen = ({ isReturn }) => {
  const navigation = useNavigation();
  const { date, time } = useSelector((state) => state.publish);
  const dispatch = useDispatch();

  useScreenArrowBack(
    navigation,
    isReturn ? PageNames.PUBLISH_INFORMATION : PageNames.PUBLISH_STOPS
  );

  const handleOnDateChange = (selectedDate) => {
    const dateAndTime = selectedDate.split(" ");
    const date = dateAndTime[0].replaceAll("/", "-");
    if (isReturn) {
      validateReturnDate(date, dateAndTime[1]);
      return;
    }
    dispatch(setDate({ date, time: dateAndTime[1] }));
  };

  // implement logic for same time departure and return
  const validateReturnDate = (returnDate, returnTime) => {
    if (returnDate === date && returnTime === time) {
      console.log("error");
      return;
    }

    dispatch(setReturnDate({ date: returnDate, time: returnTime }));
  };

  return (
    <Container>
      <Header
        text={`Pasirinkite ${isReturn ? "grįžimo" : ""} kelionės datą ir laiką`}
        size={Sizes.HEADER_MEDIUM}
      />
      <View style={PublishStyles.datePickerContainer}>
        <DatePicker
          onSelectedChange={handleOnDateChange}
          options={{ mainColor: Colors.BLUE_500 }}
          minimumDate={getFormatedTodaysDate()}
          selected={date}
        />
      </View>
      <Button
        text="Toliau"
        styling={{ marginBottom: 32 }}
        onClick={() => navigation.navigate(PageNames.PUBLISH_INFORMATION)}
      />
    </Container>
  );
};

export default PublishDateAndTimeScreen;

const styles = StyleSheet.create({});
