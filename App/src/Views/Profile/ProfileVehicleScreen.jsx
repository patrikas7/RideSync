import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { ProfileVehicleStyles } from "./ProfileStyles";
import { fetchUserCars } from "../../API/userApi";
import Spinner from "react-native-loading-spinner-overlay";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import NoResults from "../../Components/NoResults/NoResults";
import ListItem from "../../Components/List/ListItem";
import Button from "../../Components/Button/Button";

const ProfileVehicleScreen = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  useScreenArrowBack(
    navigation,
    PageNames.PROFILE_OVERVIEW,
    {},
    "close-outline"
  );

  useEffect(() => {
    const getUserCars = async () => {
      setIsLoading(true);
      const { carsList, error } = await fetchUserCars(token);

      if (!error) setCars(carsList);
      setIsLoading(false);
    };

    getUserCars();
  }, []);

  useEffect(() => {
    if (!route.params?.create) return;
    setCars((prevState) => [...prevState, route.params?.create]);
  }, [route.params?.create]);

  useEffect(() => {
    if (!route.params?.delete) return;
    const updatedCatsList = cars.filter(
      (car) => car._id !== route.params.delete
    );
    setCars(updatedCatsList);
  }, [route.params?.delete]);

  useEffect(() => {
    if (!route.params?.update) return;
    const index = cars.findIndex((car) => car._id === route.params.update._id);
    if (index !== -1) {
      const updatedCatsList = [...cars];
      updatedCatsList.splice(index, 1, route.params.update);
      setCars(updatedCatsList);
    }
  }, [route.params?.update]);

  const renderCarsList = () => (
    <>
      <View style={{ flex: 1 }}>
        {cars.map((car, index) => (
          <ListItem
            key={index}
            icon={"car"}
            text={car.licensePlateNumber}
            secondaryText={`${car.manufacturer} ${car.model} ${car.type} ${car.manufactureYear} m.`}
            onPress={() =>
              navigation.navigate(PageNames.PROFILE_VEHICLE_EDIT, { car })
            }
          />
        ))}
      </View>
      <Button
        text={"Pridėti naują automobilį"}
        styling={ProfileVehicleStyles.button}
        onClick={() => navigation.navigate(PageNames.PROFILE_NEW_VEHICLE)}
      />
    </>
  );

  const renderContent = () =>
    cars.length ? (
      renderCarsList()
    ) : (
      <NoResults
        primaryText="Jus neturite jokių užregistruotų automobilių"
        secondaryText="Užregistruokite automobilį, kad galėtumėte matyti informacija apie savo automobilius"
        buttonText="Automobilio registracija"
        onPress={() => navigation.navigate(PageNames.PROFILE_NEW_VEHICLE)}
      />
    );

  return (
    <Container>
      {isLoading ? <Spinner visible={isLoading} /> : renderContent()}
    </Container>
  );
};

export default ProfileVehicleScreen;
