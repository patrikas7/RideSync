import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useSelector, useDispatch } from "react-redux";
import { setDate, setReturnDate } from "../../redux/publish/publishSlice";
import { getFormatedTodaysDate } from "../../Utils/utils";
import {
  isAtLeastOneHourFromNow,
  isTimeGapSufficient,
  parseSelectedDate,
} from "./PublishUtils";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import DatePicker from "react-native-modern-datepicker";
import PublishStyles from "./PublishStyles";
import Colors from "../../Constants/colors";
import Button from "../../Components/Button/Button";
import ErrorMessages from "../../Constants/errorMessages";

const PublishDateAndTimeScreen = ({ isReturn }) => {
  const navigation = useNavigation();
  const { date, time, returnDate, returnTime } = useSelector(
    (state) => state.publish
  );
  const dispatch = useDispatch();

  useScreenArrowBack(
    navigation,
    isReturn ? PageNames.PUBLISH_INFORMATION : PageNames.PUBLISH_STOPS
  );

  const handleOnDateChange = (selectedDate) => {
    const { date, time } = parseSelectedDate(selectedDate);
    dispatch(
      isReturn ? setReturnDate({ date, time }) : setDate({ date, time })
    );
  };

  const handleOnNextClick = () => {
    const errorMessage = isReturn
      ? ErrorMessages.AT_LEAST_HALF_AN_HOUR_FROM_DEPARTURE
      : ErrorMessages.AT_LEAST_ONE_HOUR_FROM_NOW;

    if (
      (isReturn && !isTimeGapSufficient(date, time, returnDate, returnTime)) ||
      (!isReturn && !isAtLeastOneHourFromNow(date, time))
    ) {
      showMessage({
        message: errorMessage,
        type: "danger",
        position: "top",
      });
      return;
    }

    navigation.navigate(PageNames.PUBLISH_INFORMATION);
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
        onClick={handleOnNextClick}
      />
    </Container>
  );
};

export default PublishDateAndTimeScreen;
