import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { showMessage } from "react-native-flash-message";
import Spinner from "react-native-loading-spinner-overlay/lib";
import {
  deleteDriverAd,
  postDriverAd,
  updateDriverAd,
} from "../../API/DriversApi";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import Dropdown from "../../Components/Form/Dropdown";
import Input from "../../Components/Form/Input";
import ErrorMessages from "../../Constants/errorMessages";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import { alert, constructCarsList, isObjectEmpty } from "../../Utils/utils";
import styles from "./MyDriverAdStyles";
import useScreenIconRight from "../../hooks/useScreenIconRight";

const initialState = {
  city: "",
  price: "",
  seats: "",
  car: null,
};

const getInitialState = (isEdit, driverAd) => {
  if (!isEdit) return { ...initialState, description: "" };
  return {
    city: driverAd.city,
    price: `${driverAd.price}`,
    seats: `${driverAd.seats}`,
    car: driverAd.car._id,
    description: driverAd.description,
  };
};

const MyDriverAdFormScreen = ({ token }) => {
  const route = useRoute();
  const userCars = constructCarsList(route.params.userCars);
  const isEdit = !!route.params.driverAd;
  const [formData, setFormData] = useState(
    getInitialState(isEdit, route.params?.driverAd)
  );
  const [errors, setErrors] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useScreenArrowBack(
    navigation,
    route.params?.prevScreen || PageNames.BUSINESS_MY_DRIVER_AD_OVERVIEW
  );

  const handleOnDeletePress = () => {
    alert("Skelbimo šalinimas", "Ar tikrai norite pašalinti skelbimą", () =>
      handleOnDelete()
    );
  };

  useScreenIconRight({
    navigation,
    icons: ["trash-outline"],
    shouldRender: isEdit,
    onPress: handleOnDeletePress,
  });

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
    isEdit ? await handleOnUpdate() : await handleOnCreate();
    setIsLoading(false);
  };

  const handleOnDelete = async () => {
    setIsLoading(true);
    const response = await deleteDriverAd(token, route.params?.driverAd._id);
    if (!response?.error) {
      showMessage({
        message: "Skelbimas buvo sėkmingai pašalintas",
        type: "success",
      });

      navigation.navigate(PageNames.BUSINESS_MY_DRIVER_AD_OVERVIEW);
      setIsLoading(false);
    }
  };

  const handleOnUpdate = async () => {
    const response = await updateDriverAd(
      token,
      formData,
      route.params?.driverAd._id
    );
    if (!response?.error) {
      showMessage({
        message: "Skelbimas buvo sėkmingai atnaujintas",
        type: "success",
      });

      navigation.navigate(PageNames.BUSINESS_MY_DRIVER_AD_OVERVIEW);
    }
  };

  const handleOnCreate = async () => {
    const response = await postDriverAd(token, formData);

    if (!response?.error) {
      navigation.navigate(PageNames.PUBLISH_SUCCES);
    }
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
