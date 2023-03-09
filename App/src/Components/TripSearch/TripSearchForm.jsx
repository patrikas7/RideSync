import PropTypes from "prop-types";
import { Keyboard, View } from "react-native";
import Input from "../Form/Input";
import InputDataPicker from "../Form/InputDatePicker";
import TripSearchStyles from "./TripSearchStyles";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import ErrorMessages from "../../Constants/errorMessages";
import PageNames from "../../Constants/pageNames";
import Spinner from "react-native-loading-spinner-overlay/lib";
import useUserData from "../../hooks/useUserData";
import axios from "axios";

const InputTypes = {
  DEPARTURE: "departure",
  DESTINATION: "destination",
};

const initialState = {
  departure: {
    addressLine1: "",
    city: "",
  },
  destination: {
    addressLine1: "",
    city: "",
  },
  date: "",
  personCount: "",
};

const TripSearchForm = ({
  navigation,
  route,
  setIsStarIconVisible,
  setIsFavorite,
}) => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({
    departure: "",
    destination: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id, token } = useUserData();

  useEffect(() => {
    if (!route.params || route.params.screen !== PageNames.SEARCH) return;
    setFormState((currentState) => ({ ...currentState, ...route.params }));
  }, [route.params]);

  useEffect(() => {
    setIsStarIconVisible(
      formState.departure.addressLine1 && formState.destination.addressLine1
    );
    setIsFavorite(false);
  }, [formState.departure.addressLine1, formState.destination.addressLine1]);

  const handleOnClick = () => {
    setErrors({ departure: "", destination: "" });
    if (hasEmptyFields()) return;
    if (sameSearchCities()) return;

    saveTripSearchHistory();

    navigation.navigate({
      name: PageNames.TRIP_SEARCH_RESULTS,
      params: {
        destination: formState.destination,
        departure: formState.departure,
        date: formState.date,
        personsCount: formState.personCount,
        token,
      },
    });
  };

  const hasEmptyFields = () => {
    if (
      !formState.departure.addressLine1 ||
      !formState.destination.addressLine1 ||
      !formState.date
    ) {
      setErrors({
        departure: formState.departure.addressLine1
          ? ""
          : ErrorMessages.REQUIRED_FIELD,
        destination: formState.destination.addressLine1
          ? ""
          : ErrorMessages.REQUIRED_FIELD,
        date: formState.date ? "" : ErrorMessages.REQUIRED_FIELD,
      });
      return true;
    }
  };

  const sameSearchCities = () => {
    if (formState.departure.city === formState.destination.city) {
      setErrors({ destination: ErrorMessages.SAME_CITIES });
      return true;
    }
  };

  const saveTripSearchHistory = async () => {
    try {
      await axios.post(
        "/search/history/trips",
        {
          id,
          departure: formState.departure.addressLine1,
          destination: formState.destination.addressLine1,
        },
        {
          headers: { Authorization: token },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnFocus = (inputType, value) => {
    setIsStarIconVisible(false);
    navigation.navigate(PageNames.CITY_SEARCH, {
      inputType,
      value,
      prevScreen: PageNames.SEARCH,
    });
    Keyboard.dismiss();
  };

  return (
    <View style={TripSearchStyles.searchContainer}>
      <Spinner visible={isLoading} />
      <View style={TripSearchStyles.formContainer}>
        <Input
          placeholder={"Išvykimo vieta"}
          icon={"pin-outline"}
          value={formState.departure.addressLine1}
          hasError={!!errors.departure}
          errorText={errors.departure}
          onFocus={() =>
            handleOnFocus(
              InputTypes.DEPARTURE,
              formState.departure.addressLine1
            )
          }
        />
        <Input
          placeholder={"Atvykimo vieta"}
          icon={"pin-outline"}
          value={formState.destination.addressLine1}
          hasError={!!errors.destination}
          errorText={errors.destination}
          onFocus={() =>
            handleOnFocus(
              InputTypes.DESTINATION,
              formState.destination.addressLine1
            )
          }
        />

        <View style={TripSearchStyles.inlineInputContainer}>
          <View style={TripSearchStyles.inlineInput}>
            <InputDataPicker
              placeholder={"Kelionės data"}
              minimumDate={new Date()}
              value={formState.date}
              onSelect={(value) =>
                setFormState((currentState) => ({
                  ...currentState,
                  date: value,
                }))
              }
              hasError={!!errors.date}
              errorText={errors.date}
            />
          </View>
          <View style={TripSearchStyles.inlineInput}>
            <Input
              placeholder={"Žmonių skaičius"}
              icon={"people-outline"}
              inputMode={"numeric"}
              value={formState.personCount}
              onChange={(value) =>
                setFormState((currentState) => ({
                  ...currentState,
                  personCount: value,
                }))
              }
            />
          </View>
        </View>
      </View>
      <Button text={"Ieškoti"} onClick={handleOnClick} />
    </View>
  );
};

TripSearchForm.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  setIsStarIconVisible: PropTypes.func,
  setIsFavorite: PropTypes.func,
};

export default TripSearchForm;
