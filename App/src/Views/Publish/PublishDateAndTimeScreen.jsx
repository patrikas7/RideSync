import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import DatePicker from "react-native-modern-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "../../redux/publish/publishSlice";
import PublishStyles from "./PublishStyles";
import Colors from "../../Constants/colors";
import { getFormatedTodaysDate } from "../../Utils/utils";
import Button from "../../Components/Button/Button";

const PublishDateAndTimeScreen = () => {
  const navigation = useNavigation();
  const { date } = useSelector((state) => state.publish);
  const dispatch = useDispatch();

  useScreenArrowBack(navigation, PageNames.PUBLISH_STOPS);

  const handleOnDateChange = (selectedDate) => {
    const dateAndTime = selectedDate.split(" ");
    const date = dateAndTime[0].replaceAll("/", "-");
    dispatch(setDate({ date, time: dateAndTime[1] }));
  };

  return (
    <Container>
      <Header
        text="Pasirinkite kelionės datą ir laiką"
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
