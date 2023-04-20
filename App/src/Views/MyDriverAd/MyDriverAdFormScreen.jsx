import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { showMessage } from "react-native-flash-message";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { postDriverAd } from "../../API/DriversApi";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import Dropdown from "../../Components/Form/Dropdown";
import Input from "../../Components/Form/Input";
import ErrorMessages from "../../Constants/errorMessages";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import { constructCarsList, isObjectEmpty } from "../../Utils/utils";
import styles from "./MyDriverAdStyles";

const initialState = {
  city: "",
  price: "",
  seats: "",
  car: null,
};

const MyDriverAdFormScreen = ({ token }) => {
  const [formData, setFormData] = useState({
    ...initialState,
    description: "",
  });
  const [errors, setErrors] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const userCars = constructCarsList(route.params.userCars);
  useScreenArrowBack(navigation, PageNames.BUSINESS_MY_DRIVER_AD_OVERVIEW);

  useEffect(() => {
    if (!route.params?.departure) return;

    setFormData((prevState) => ({
      ...prevState,
      city: route.params.departure.city,
    }));
  }, [route.params?.departure]);

  const handleOnPersonsCountChange = (seats) => {
    if (+seats > 4) {
      showMessage({
        message: ErrorMessages.EXCEEDING_PEOPLE_COUNT,
        type: "danger",
        position: "top",
      });

      return;
    }

    setFormData((prevState) => ({ ...prevState, seats }));
  };

  const handleOnCityInputFocus = () => {
    navigation.navigate(PageNames.CITY_SEARCH, {
      inputType: "departure",
      value: formData.city,
      prevScreen: PageNames.BUSINESS_MY_DRIVER_AD_FORM,
      navigateToPrev: true,
      isCitySearch: true,
      props: { userCars: route.params.userCars },
    });
  };

  const handleOnSubmit = async () => {
    setErrors(initialState);
    if (!isFormValid()) return;
    setIsLoading(true);
    const { error } = await postDriverAd(token, formData);

    if (!error) {
    }

    setIsLoading(false);
  };

  const isFormValid = () => {
    const formErrors = {};

    if (!formData.city) formErrors.city = ErrorMessages.REQUIRED_FIELD;
    if (!formData.price) formErrors.price = ErrorMessages.REQUIRED_FIELD;
    if (!formData.seats) formErrors.seats = ErrorMessages.REQUIRED_FIELD;
    if (!formData.car) formErrors.car = ErrorMessages.REQUIRED_FIELD;

    setErrors(formErrors);
    return isObjectEmpty(formErrors);
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <View style={styles.container}>
        <Input
          placeholder={"Miestas"}
          icon={"home-outline"}
          value={formData.city}
          onChange={(city) =>
            setFormData((prevState) => ({ ...prevState, city }))
          }
          onFocus={handleOnCityInputFocus}
          hasError={!!errors.city}
          errorText={errors.city}
        />

        <Input
          placeholder={"Valandinis tarifas"}
          inputMode={"numeric"}
          icon={"cash-outline"}
          value={formData.price}
          onChange={(price) =>
            setFormData((prevState) => ({ ...prevState, price }))
          }
          hasError={!!errors.price}
          errorText={errors.price}
        />

        <Input
          placeholder={"Keleivių skaičius"}
          inputMode={"numeric"}
          icon={"people-outline"}
          value={formData.seats}
          onChange={handleOnPersonsCountChange}
          hasError={!!errors.seats}
          errorText={errors.seats}
        />

        <Dropdown
          placeholder={"Automobilis"}
          items={userCars}
          value={formData.car}
          onValueChange={(car) =>
            setFormData((prevState) => ({ ...prevState, car }))
          }
          hasError={!!errors.car}
          errorText={errors.car}
        />

        <Input
          placeholder={"Aprašymas"}
          value={formData.description}
          onChange={(description) =>
            setFormData((prevState) => ({ ...prevState, description }))
          }
          isMultiline={true}
          numberOfLines={8}
          containerStyling={styles.multiline}
        />
      </View>

      <Button
        text={"Skelbti"}
        styling={styles.button}
        onClick={handleOnSubmit}
      />
    </Container>
  );
};

export default MyDriverAdFormScreen;
