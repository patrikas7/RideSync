import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { ProfileVehicleStyles } from "./ProfileStyles";
import { hasObjectEmptyValues, printError } from "../../Utils/utils";
import { showMessage } from "react-native-flash-message";
import Spinner from "react-native-loading-spinner-overlay";
import Button, { ButtonColor } from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import InputSearch from "../../Components/Form/InputSearch";
import ErrorMessages from "../../Constants/errorMessages";
import Dropdown from "../../Components/Form/Dropdown";
import useScreenIconRight from "../../hooks/useScreenIconRight";

const ProfileNewVehicleScreen = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [carsData, setCardsData] = useState({
    carMakes: [],
    carModels: [],
    carTypes: [],
    carYears: [],
  });
  const [displayedCarModels, setDisplayedCarModels] = useState([]);
  const [vehicle, setVehicle] = useState({
    licensePlateNumber: "",
    manufacturer: null,
    model: null,
    type: null,
    manufactureYear: null,
  });
  const navigation = useNavigation();
  const route = useRoute();
  const car = route.params?.car;
  const isEdit = !!car;

  useScreenArrowBack(navigation, PageNames.PROFILE_VEHICLE);

  const handleOnDelete = () => {
    Alert.alert(
      "Automobilio šalinimas",
      "Ar tikrai norite pašalinti automobilį?",
      [
        {
          text: "Ne",
        },
        {
          text: "Taip",
          onPress: () => deleteVehicle(),
        },
      ]
    );
  };

  useScreenIconRight({
    navigation,
    icons: ["trash-outline"],
    shouldRender: isEdit,
    onPress: handleOnDelete,
  });

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (!carsData.carModels.length || !car) return;
    const { licensePlateNumber, manufacturer, model, type, manufactureYear } =
      car;

    setVehicle({
      licensePlateNumber,
      manufacturer,
      model,
      type,
      manufactureYear: manufactureYear.toString(),
    });
  }, [carsData.carModels]);

  useEffect(() => {
    if (!vehicle.manufacturer) return;
    const carModelsToDisplay = carsData.carModels.filter(
      (model) => model.make === vehicle.manufacturer.toLowerCase()
    );

    setDisplayedCarModels(carModelsToDisplay);
  }, [vehicle.manufacturer]);

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
      showInfoMessage(ErrorMessages.ALL_FIELDS_ARE_REQUIRED);
      return;
    }
    if (!isPlateNumberValid()) {
      showInfoMessage(ErrorMessages.PLATE_NUMBER_VALIDATION);
      return;
    }

    registerVehicle();
  };

  const registerVehicle = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/car", vehicle, {
        headers: { Authorization: token },
      });

      showInfoMessage("Automobilis buvo sėkmingai užregistruotas", "success");
      navigation.navigate(PageNames.PROFILE_VEHICLE, {
        create: data.car,
        update: null,
        delete: null,
      });
    } catch (error) {
      printError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVehicle = async () => {
    setIsLoading(true);
    try {
      const id = route.params.car._id;
      await axios.delete("/car", {
        params: { id },
        headers: { Authorization: token },
      });

      showInfoMessage("Automobilis buvo sėkmingai pašalintas", "success");
      navigation.navigate(PageNames.PROFILE_VEHICLE, {
        delete: id,
        create: null,
        update: null,
      });
    } catch (error) {
      showInfoMessage(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnUpdate = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.put("/car", vehicle, {
        params: { id: route.params.car._id },
        headers: { Authorization: token },
      });

      showInfoMessage("Automobilis buvo sėkmingai pašalintas", "success");
      navigation.navigate(PageNames.PROFILE_VEHICLE, {
        delete: null,
        create: null,
        update: data.car,
      });
    } catch (error) {
      printError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showInfoMessage = (message, type = "danger") => {
    showMessage({
      message,
      type,
    });
  };

  const isPlateNumberValid = () => {
    const plateNumberRegex = /^[A-Z]{3} [0-9]{3}$/;
    return plateNumberRegex.test(vehicle.licensePlateNumber);
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <View style={ProfileVehicleStyles.newVehicleForm}>
        <InputSearch
          placeholder={"Valstybinis nr. ABC 123"}
          value={vehicle.licensePlateNumber}
          onChange={(licensePlateNumber) =>
            setVehicle((prevState) => ({ ...prevState, licensePlateNumber }))
          }
        />

        <Dropdown
          placeholder={"Automobilio gamintojas.."}
          items={carsData.carMakes}
          value={vehicle.manufacturer}
          onValueChange={(manufacturer) =>
            setVehicle((prevState) => ({
              ...prevState,
              manufacturer,
              model:
                prevState.manufacturer === manufacturer ? prevState.model : "",
            }))
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
          value={vehicle.manufactureYear}
          onValueChange={(manufactureYear) =>
            setVehicle((prevState) => ({ ...prevState, manufactureYear }))
          }
        />
      </View>

      <Button
        text={isEdit ? "Atnaujinti" : "Registruoti"}
        styling={ProfileVehicleStyles.button}
        onClick={isEdit ? handleOnUpdate : handleOnRegister}
      />
    </Container>
  );
};

export default ProfileNewVehicleScreen;
