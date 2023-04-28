import { View } from "react-native";
import { useEffect } from "react";
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
  PublishTypes,
  setSelectedCar,
} from "../../redux/publish/publishSlice";
import { showMessage } from "react-native-flash-message";
import { getPublishInformationNextScreen } from "../../Views/Publish/PublishUtils";
import { PublishInformationFormStyles } from "./PublishStyles";
import Input from "../Form/Input";
import Button from "../Button/Button";
import InputSwitch from "../Form/InputSwitch";
import ErrorMessages from "../../Constants/errorMessages";
import Dropdown from "../Form/Dropdown";
import { isObjectEmpty } from "../../Utils/utils";

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
    const { publishType, price, personsCount, isRoundTrip, car } = state;
    const errors = {};
    dispatch(resetErrors());

    if (publishType === PublishTypes.PUBLISH_TRIP) {
      if (!price) {
        dispatch(setPriceError(ErrorMessages.REQUIRED_FIELD));
        errors.price = ErrorMessages.REQUIRED_FIELD;
      }
      if (!car) {
        showMessage({ message: ErrorMessages.CAR_IS_REQUIRED, type: "danger" });
        errors.car = ErrorMessages.REQUIRED_FIELD;
      }
    }

    if (!personsCount) {
      dispatch(setPersonsCountError(ErrorMessages.REQUIRED_FIELD));
      errors.personsCount = ErrorMessages.REQUIRED_FIELD;
    }

    if (!isObjectEmpty(errors)) return;

    dispatch(resetErrors());
    navigation.navigate(
      getPublishInformationNextScreen(publishType, isRoundTrip)
    );
  };

  console.log(state.userCars);

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

        {state.publishType === PublishTypes.PUBLISH_TRIP && (
          <>
            <Input
              placeholder={"Kaina vienam keleiviui"}
              icon={"cash-outline"}
              inputMode={"numeric"}
              value={state.price}
              onChange={(value) => dispatch(setPrice(value))}
              hasError={!!errorState.price}
              errorText={errorState.price}
              maxLength={5}
              disabled={state.isTripFree}
            />

            <Dropdown
              placeholder={"Automobilis"}
              items={state.userCars}
              value={state.car}
              onValueChange={(val) => dispatch(setSelectedCar(val))}
            />
          </>
        )}

        <Input
          placeholder={"Papildomi komentarai"}
          value={state.comments}
          onChange={(value) => dispatch(setComments(value))}
          isMultiline={true}
          numberOfLines={4}
          containerStyling={PublishInformationFormStyles.multiline}
        />

        {state.publishType === PublishTypes.PUBLISH_TRIP && (
          <>
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
          </>
        )}
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
