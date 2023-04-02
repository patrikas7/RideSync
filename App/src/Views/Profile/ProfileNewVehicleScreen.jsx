import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { ProfileVehicleStyles } from "./ProfileStyles";
import { hasObjectEmptyValues, printError } from "../../Utils/utils";
import { showMessage } from "react-native-flash-message";
import Spinner from "react-native-loading-spinner-overlay";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import InputSearch from "../../Components/Form/InputSearch";
import ErrorMessages from "../../Constants/errorMessages";
import Dropdown from "../../Components/Form/Dropdown";

const ProfileNewVehicleScreen = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [carsData, setCardsData] = useState({
    carMakes: [],
    carModels: [],
    carTypes: [],
    carYears: [],
  });
  const [displayedCarModels, setDisplayedCardModels] = useState([]);
  const [vehicle, setVehicle] = useState({
    plateNumber: "",
    make: null,
    model: null,
    type: null,
    makeDate: null,
  });
  const navigation = useNavigation();
  useScreenArrowBack(navigation, PageNames.PROFILE_VEHICLE);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (!vehicle.make) return;
    const carModelsToDisplay = carsData.carModels.filter(
      (model) => model.make === vehicle.make.toLowerCase()
    );
    setDisplayedCardModels(carModelsToDisplay);
  }, [vehicle.make]);

  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/cars/data", {
        headers: { Authorization: token },
      });

      setCardsData({
        carMakes: data.manufacturers,
        carModels: data.models,
        carTypes: data.carTypes,
        carYears: data.years,
      });
    } catch (error) {
      printError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnRegister = () => {
    if (hasObjectEmptyValues(vehicle)) {
      showError(ErrorMessages.ALL_FIELDS_ARE_REQUIRED);
      return;
    }
    if (!isPlateNumberValid()) {
      showError(ErrorMessages.PLATE_NUMBER_VALIDATION);
      return;
    }
  };

  const showError = (message) => {
    showMessage({
      message,
      type: "danger",
    });
  };

  const isPlateNumberValid = () => {
    const plateNumberRegex = /^[A-Z]{3} [0-9]{3}$/;
    return plateNumberRegex.test(vehicle.plateNumber);
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <View style={ProfileVehicleStyles.newVehicleForm}>
        <InputSearch
          placeholder={"Valstybinis nr. ABC 123"}
          value={vehicle.plateNumber}
          onChange={(plateNumber) =>
            setVehicle((prevState) => ({ ...prevState, plateNumber }))
          }
        />

        <Dropdown
          placeholder={"Automobilio gamintojas.."}
          items={carsData.carMakes}
          value={vehicle.make}
          onValueChange={(make) =>
            setVehicle((prevState) => ({ ...prevState, make, model: "" }))
          }
        />

        <Dropdown
          placeholder={"Automobilio modelis.."}
          items={displayedCarModels}
          value={vehicle.model}
          onValueChange={(model) =>
            setVehicle((prevState) => ({ ...prevState, model }))
          }
        />

        <Dropdown
          placeholder={"Kėbulo tipas.."}
          items={carsData.carTypes}
          value={vehicle.type}
          onValueChange={(type) =>
            setVehicle((prevState) => ({ ...prevState, type }))
          }
        />

        <Dropdown
          placeholder={"Gamybos metai.."}
          items={carsData.carYears}
          value={vehicle.makeDate}
          onValueChange={(makeDate) =>
            setVehicle((prevState) => ({ ...prevState, makeDate }))
          }
        />
      </View>
      <Button
        text={"Registruoti"}
        styling={ProfileVehicleStyles.button}
        onClick={handleOnRegister}
      />
    </Container>
  );
};

export default ProfileNewVehicleScreen;
