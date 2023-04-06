import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useSelector, useDispatch } from "react-redux";
import {
  PublishTypes,
  setDate,
  setReturnDate,
} from "../../redux/publish/publishSlice";
import {
  isAtLeastOneHourFromNow,
  isTimeGapSufficient,
  getDateAndTimePrevScreen,
} from "./PublishUtils";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import Container from "../../Components/Container/Container";
import Button from "../../Components/Button/Button";
import ErrorMessages from "../../Constants/errorMessages";
import DateAndTimePicker from "../../Components/TimeAndDatePicker/TimeAndDatePicker";

const PublishDateAndTimeScreen = ({ isReturn }) => {
  const navigation = useNavigation();
  const { date, time, returnDate, returnTime, publishType } = useSelector(
    (state) => state.publish
  );
  const dispatch = useDispatch();

  useScreenArrowBack(
    navigation,
    getDateAndTimePrevScreen(publishType, isReturn)
  );

  const handleOnDateChange = ({ date, time }) => {
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
      <DateAndTimePicker
        handleOnDateChange={handleOnDateChange}
        date={date}
        headline={`Pasirinkite ${
          isReturn ? "grįžimo" : ""
        } kelionės datą ir laiką`}
      />
      <Button
        text="Toliau"
        styling={{ marginBottom: 32 }}
        onClick={handleOnNextClick}
      />
    </Container>
  );
};

export default PublishDateAndTimeScreen;
