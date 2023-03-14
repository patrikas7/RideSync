import { View } from "react-native";
import PublishInformationFormStyles from "./PublishInformationFormStyles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  resetErrors,
  setComments,
  setPersonsCount,
  setPersonsCountError,
  setPriceError,
  toggleIsRoundTrip,
  toggleIsTripFree,
  setPrice,
} from "../../redux/publish/publishSlice";
import Input from "../Form/Input";
import Button from "../Button/Button";
import InputSwitch from "../Form/InputSwitch";
import PageNames from "../../Constants/pageNames";
import ErrorMessages from "../../Constants/errorMessages";
import { showMessage } from "react-native-flash-message";
import { useEffect } from "react";

const PublishInformationForm = () => {
  const state = useSelector((state) => state.publish);
  const errorState = useSelector((state) => state.publishErrors);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (state.isTripFree) dispatch(setPrice("0"));
  }, [state.isTripFree]);

  const handleOnPersonsCountChange = (number) => {
    if (+number > 4) {
      showMessage({
        message: ErrorMessages.EXCEEDING_PEOPLE_COUNT,
        type: "danger",
        position: "top",
      });

      return;
    }

    dispatch(setPersonsCount(number));
  };

  const handleOnNextClick = () => {
    dispatch(resetErrors());
    if (!state.price || !state.personsCount) {
      if (!state.price) dispatch(setPriceError(ErrorMessages.REQUIRED_FIELD));
      if (!state.personsCount)
        dispatch(setPersonsCountError(ErrorMessages.REQUIRED_FIELD));
      return;
    }

    navigation.navigate(
      state.isRoundTrip
        ? PageNames.PUBLISH_RETURN_DATE_AND_TIME
        : PageNames.CITY_SEARCH
    );
  };

  return (
    <View style={PublishInformationFormStyles.formContainer}>
      <View style={PublishInformationFormStyles.fieldsContainer}>
        <Input
          placeholder={"Keleivių skaičius"}
          icon={"people-outline"}
          inputMode={"numeric"}
          value={state.personsCount}
          onChange={handleOnPersonsCountChange}
          hasError={!!errorState.personsCount}
          errorText={errorState.personsCount}
          maxLength={2}
        />

        <Input
          placeholder={"Kaina"}
          icon={"cash-outline"}
          inputMode={"numeric"}
          value={state.price}
          onChange={(value) => dispatch(setPrice(value))}
          hasError={!!errorState.price}
          errorText={errorState.price}
          maxLength={5}
          disabled={state.isTripFree}
        />

        <Input
          placeholder={"Papildomi komentarai"}
          value={state.comments}
          onChange={(value) => dispatch(setComments(value))}
          isMultiline={true}
          numberOfLines={4}
          containerStyling={PublishInformationFormStyles.multiline}
        />

        <InputSwitch
          isEnabled={state.isTripFree}
          onChange={() => dispatch(toggleIsTripFree())}
          text="Ar kelionė yra nemokama?"
        />
        <InputSwitch
          isEnabled={state.isRoundTrip}
          onChange={() => dispatch(toggleIsRoundTrip())}
          text="Ar bus grįžtama tuo pačiu maršrutu?"
        />
      </View>
      <Button
        text="Toliau"
        styling={PublishInformationFormStyles.button}
        onClick={handleOnNextClick}
      />
    </View>
  );
};

export default PublishInformationForm;
