import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { fetchDriversList } from "../../API/DriversApi";
import Container from "../../Components/Container/Container";
import NoResults from "../../Components/NoResults/NoResults";

const DriversList = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [driversList, setDriversList] = useState([]);

  useEffect(() => {
    if (!token) return;
    const getDriversList = async () => {
      setIsLoading(true);
      const { driversAds, error } = await fetchDriversList(token);
      if (!error) setDriversList(driversAds);

      setIsLoading(false);
    };

    getDriversList();
  }, [token]);

  return (
    <Container>
      {isLoading && <Spinner visible={isLoading} />}
      {!isLoading && !driversList?.length && (
        <NoResults
          primaryText="Nerasta jokių aktyvių vairuotojų skelbimų"
          secondaryText="Bandykite vėliau arba įkelkite savo vairuotojo skelbimą!"
          buttonText="Sukurti vairuotojo skelbimą"
        />
      )}
    </Container>
  );
};

export default DriversList;
