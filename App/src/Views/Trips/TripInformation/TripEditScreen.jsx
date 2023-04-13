import { ScrollView, Keyboard, Text } from "react-native";
import { useEffect, useState } from "react";
import { TripEditStyles } from "./TripInformationStyles";
import { constructCarsList, printError } from "../../../Utils/utils";
import { showMessage } from "react-native-flash-message";
import Container from "../../../Components/Container/Container";
import InputSearch from "../../../Components/Form/InputSearch";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import Input from "../../../Components/Form/Input";
import InputSwitch from "../../../Components/Form/InputSwitch";
import Button from "../../../Components/Button/Button";
import Dropdown from "../../../Components/Form/Dropdown";
import Spinner from "react-native-loading-spinner-overlay/lib";
import axios from "axios";
import ErrorMessages from "../../../Constants/errorMessages";

const TripEditScreen = ({ route, navigation }) => {
  const {
    token,
    id,
    trip: currentTrip,
    prevScreen,
    isTripSearchRequest,
  } = route.params;
  const [trip, setTrip] = useState(currentTrip);
  const [isLoading, setIsLoading] = useState(false);
  const [userCars, setUserCars] = useState([]);
  const [errors, setErrors] = useState({ personsCount: "", price: "" });
  useScreenArrowBack(navigation, prevScreen);

  useEffect(() => {
    if (!route.params?.departure) return;

    setTrip((prevState) => ({
      ...prevState,
      departure: route.params.departure,
    }));
  }, [route.params?.departure]);

  useEffect(() => {
    if (!route.params?.destination) return;

    setTrip((prevState) => ({
      ...prevState,
      destination: route.params.destination,
    }));
  }, [route.params?.destination]);

  useEffect(() => {
    if (!token || isTripSearchRequest) return;

    const fetchUsersVehicle = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/user/car", {
          params: { id },
          headers: { Authorization: token },
        });

        setUserCars(constructCarsList(data.carsList));
      } catch (error) {
        printError(error);
      }

      setIsLoading(false);
    };

    fetchUsersVehicle();
  }, [token, isTripSearchRequest]);

  const handleOnInputFocus = (inputType) => {
    navigation.navigate(PageNames.CITY_SEARCH, {
      inputType,
      value: trip[inputType].addressLine1,
      prevScreen: PageNames.TRIP_EDIT,
      navigateToPrev: true,
      props: { trip, token, id, isTripSearchRequest },
    });

    Keyboard.dismiss();
  };

  const handleOnNext = () => {
    setErrors({ personsCount: "", price: "" });

    const carIsRequired = !isTripSearchRequest && !trip?.car._id;
    if (carIsRequired) {
      showMessage({ message: ErrorMessages.CAR_IS_REQUIRED, type: "danger" });
      return;
    }

    const sameCitiesError = trip.departure.city === trip.destination.city;
    if (sameCitiesError) {
      showMessage({ message: ErrorMessages.SAME_CITIES, type: "danger" });
      return;
    }

    const personsCountIsRequired =
      (!isTripSearchRequest && !trip.personsCount) ||
      (isTripSearchRequest && !trip.passengersCount);
    if (personsCountIsRequired) {
      setErrors((prevState) => ({
        ...prevState,
        personsCount: ErrorMessages.REQUIRED_FIELD,
      }));
      return;
    }

    const priceIsRequired = !isTripSearchRequest && !trip.price;
    if (priceIsRequired) {
      setErrors((prevState) => ({
        ...prevState,
        price: ErrorMessages.REQUIRED_FIELD,
      }));
      return;
    }

    navigation.navigate(PageNames.TRIP_DATE_AND_TIME_EDIT, {
      trip,
      token,
      id,
      prevScreen: route.name,
      isTripSearchRequest,
    });
  };

  const handlePersonsCountChange = (count) => {
    const updatedTrip = isTripSearchRequest
      ? { ...trip, passengersCount: count }
      : { ...trip, personsCount: count };
    setTrip(updatedTrip);
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <ScrollView>
        <Text style={TripEditStyles.headline}>
          Kelionės atvykimo ir išvykimo lokacijos
        </Text>
        <InputSearch
          placeholder={"Išvykimo vieta"}
          styling={{ marginTop: 16 }}
          value={trip.departure.addressLine1}
          onFocus={() => handleOnInputFocus("departure")}
        />

        <InputSearch
          placeholder={"Atvykimo vieta"}
          styling={{ marginTop: 16 }}
          value={trip.destination.addressLine1}
          onFocus={() => handleOnInputFocus("destination")}
        />

        {trip?.stops?.length > 0 && (
          <>
            <Text
              style={[TripEditStyles.headline, TripEditStyles.headlineNotFirst]}
            >
              Kelionės sustojimų lokacijos
            </Text>
            {trip.stops.map((stop, index) => (
              <InputSearch
                placeholder={`${index + 1} sustojimas`}
                styling={{ marginTop: 16 }}
                value={stop.addressLine1}
                onFocus={() => handleOnInputFocus("destination")}
              />
            ))}
          </>
        )}
        {!isTripSearchRequest && (
          <>
            <Text
              style={[TripEditStyles.headline, TripEditStyles.headlineNotFirst]}
            >
              Kelionės automobilis
            </Text>
            <Dropdown
              value={trip.car._id}
              items={userCars}
              placeholder={"Pasirinkite automobilį"}
              onValueChange={(id) =>
                setTrip((prevState) => ({ ...prevState, car: { _id: id } }))
              }
            />
          </>
        )}

        <Text
          style={[TripEditStyles.headline, TripEditStyles.headlineNotFirst]}
        >
          Kita kelionės informacija
        </Text>

        <Input
          placeholder={"Keleivių skaičius"}
          icon={"people-outline"}
          inputMode={"numeric"}
          value={
            trip?.personsCount?.toString() || trip?.passengersCount?.toString()
          }
          containerStyling={{ marginTop: 16 }}
          onChange={handlePersonsCountChange}
          hasError={!!errors.personsCount}
          errorText={errors.personsCount}
          maxLength={2}
        />

        {!isTripSearchRequest && (
          <Input
            placeholder={"Kaina vienam keleiviui"}
            icon={"cash-outline"}
            inputMode={"numeric"}
            value={trip.price}
            onChange={(price) =>
              setTrip((prevState) => ({ ...prevState, price }))
            }
            hasError={!!errors.price}
            errorText={errors.price}
            maxLength={5}
            disabled={trip.isTripFree}
          />
        )}

        <Input
          placeholder={"Papildomi komentarai"}
          value={trip.comments}
          onChange={(comments) =>
            setTrip((prevState) => ({ ...prevState, comments }))
          }
          isMultiline={true}
          numberOfLines={4}
          containerStyling={{ marginTop: 16 }}
        />

        {!isTripSearchRequest && (
          <>
            <InputSwitch
              isEnabled={trip.isTripFree}
              onChange={() =>
                setTrip((prevState) => ({
                  ...prevState,
                  isTripFree: !isTripFree,
                }))
              }
              text="Ar kelionė yra nemokama?"
            />

            <InputSwitch
              isEnabled={trip.isRoundTrip}
              onChange={() =>
                setTrip((prevState) => ({
                  ...prevState,
                  isRoundTrip: !isRoundTrip,
                }))
              }
              text="Ar bus grįžtama tuo pačiu maršrutu?"
              styling={{ marginBottom: 32 }}
            />
          </>
        )}
      </ScrollView>
      <Button
        text={"Toliau"}
        styling={{ marginBottom: 32 }}
        onClick={handleOnNext}
      />
    </Container>
  );
};

export default TripEditScreen;
