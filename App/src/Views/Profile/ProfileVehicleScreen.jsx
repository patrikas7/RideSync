import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { printError } from "../../Utils/utils";
import { ProfileVehicleStyles } from "./ProfileStyles";
import Spinner from "react-native-loading-spinner-overlay";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import axios from "axios";
import NoResults from "../../Components/NoResults/NoResults";
import ListItem from "../../Components/List/ListItem";
import Button from "../../Components/Button/Button";

const ProfileVehicleScreen = ({ token, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  useScreenArrowBack(navigation, PageNames.PROFILE_OVERVIEW);

  useEffect(() => {
    fetchUserCars();
  }, []);

  useEffect(() => {
    if (!route.params?.car) return;
    setCars((prevState) => [...prevState, route.params?.car]);
  }, [route.params?.car]);

  const fetchUserCars = async () => {
    try {
      const { data } = await axios.get("/user/car", {
        params: { id },
        headers: { Authorization: token },
      });

      setCars(data.carsList);
    } catch (error) {
      printError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCarsList = () => (
    <>
      <View style={{ flex: 1 }}>
        {cars.map((car, index) => (
          <ListItem
            key={index}
            icon={"car"}
            text={car.licensePlateNumber}
            secondaryText={`${car.manufacturer} ${car.model} ${car.type} ${car.manufactureYear} m.`}
            onPress={() => console.log()}
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
