import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { printError } from "../../Utils/utils";
import Spinner from "react-native-loading-spinner-overlay";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import axios from "axios";
import NoResults from "../../Components/NoResults/NoResults";

const ProfileVehicleScreen = ({ token, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const navigation = useNavigation();
  useScreenArrowBack(navigation, PageNames.PROFILE_OVERVIEW);

  useEffect(() => {
    fetchUserCars();
  }, []);

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

  const renderContent = () => {
    return (
      <NoResults
        primaryText="Jus neturite jokių užregistruotų automobilių"
        secondaryText="Užregistruokite automobilį, kad galėtumėte matyti informacija apie savo automobilius"
        buttonText="Automobilio registracija"
        onPress={() => navigation.navigate(PageNames.PROFILE_NEW_VEHICLE)}
      />
    );
  };

  return (
    <Container>
      {isLoading ? <Spinner visible={isLoading} /> : renderContent()}
    </Container>
  );
};

export default ProfileVehicleScreen;
