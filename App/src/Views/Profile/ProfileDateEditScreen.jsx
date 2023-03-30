import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { count18YearsInThePast } from "../../Utils/utils";
import { ProfileValueEditScreenStyles } from "./ProfileStyles";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import ErrorMessages from "../../Constants/errorMessages";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import DateAndTimePicker from "../../Components/TimeAndDatePicker/TimeAndDatePicker";
import Button from "../../Components/Button/Button";

const ProfileDateEditScreen = ({ token }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, user } = route.params;
  const [value, setValue] = useState(user.dateOfBirth.slice(0, 10));
  const [isLoading, setIsLoading] = useState(false);
  useScreenArrowBack(
    navigation,
    PageNames.PROFILE_DETAILS,
    { user },
    "close-outline"
  );

  const handleOnSavePress = async () => {
    if (value === user.dateOfBirth.slice(0, 10)) {
      redirectBack(user);
      return;
    }

    if (!value) {
      showMessage({
        message: ErrorMessages.EMPTY_FIELD,
        type: "danger",
      });

      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.put(
        "/user",
        {
          field: "dateOfBirth",
          value,
        },
        { headers: { Authorization: token } }
      );

      redirectBack(data.user);
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectBack = (userDetails) => {
    navigation.navigate(PageNames.PROFILE_DETAILS, { user: userDetails });
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <Header text={title} size={Sizes.HEADER_MEDIUM} />
      <DateAndTimePicker
        date={value}
        mode={"calendar"}
        handleOnDateChange={({ date }) => setValue(date)}
        isPastDatesAllowed={true}
        maximumDate={count18YearsInThePast()}
        current={user.dateOfBirth.slice(0, 10)}
      />

      <Button
        text={"Išsaugoti"}
        styling={ProfileValueEditScreenStyles.button}
        onClick={handleOnSavePress}
      />
    </Container>
  );
};

export default ProfileDateEditScreen;
