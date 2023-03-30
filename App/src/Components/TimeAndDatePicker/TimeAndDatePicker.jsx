import { View } from "react-native";
import { getFormatedTodaysDate } from "../../Utils/utils";
import { parseSelectedDate } from "../../Views/Publish/PublishUtils";
import styles from "./TimeAndDatePickerStyles";
import Header from "../Form/Header";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";
import DatePicker from "react-native-modern-datepicker";

const DateAndTimePicker = ({
  headline,
  handleOnDateChange,
  date,
  maximumDate,
  isPastDatesAllowed,
  current,
  mode = "datepicker",
}) => {
  const handleOnChange = (selectedDate) =>
    handleOnDateChange(parseSelectedDate(selectedDate));

  return (
    <>
      {headline && <Header text={headline} size={Sizes.HEADER_MEDIUM} />}
      <View style={styles.datePickerContainer}>
        <DatePicker
          onSelectedChange={handleOnChange}
          options={{ mainColor: Colors.BLUE_500 }}
          minimumDate={isPastDatesAllowed ? "" : getFormatedTodaysDate()}
          maximumDate={maximumDate}
          selected={date}
          mode={mode}
          current={current}
        />
      </View>
    </>
  );
};

export default DateAndTimePicker;
