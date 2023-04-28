import { useEffect } from "react";
import { useState } from "react";
import { fetchDriversList } from "../../API/DriversApi";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Container from "../../Components/Container/Container";
import NoResults from "../../Components/NoResults/NoResults";
import PageNames from "../../Constants/pageNames";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import DriversList from "../../Components/DriversList/DriversList";

const DriversListScreen = ({ token, tabsNavigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [driversList, setDriversList] = useState([]);
  const isFocuesed = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (!token || !isFocuesed) return;
    const getDriversList = async () => {
      setIsLoading(true);
      const { driversAds, error } = await fetchDriversList(token);
      if (!error) setDriversList(driversAds);

      setIsLoading(false);
    };

    getDriversList();
  }, [token, isFocuesed]);

  return (
    <Container>
      {isLoading && <Spinner visible={isLoading} />}
      {!isLoading && !driversList?.length && (
        <NoResults
          primaryText="Nerasta jokių aktyvių vairuotojų skelbimų"
          secondaryText="Bandykite vėliau arba įkelkite savo vairuotojo skelbimą!"
          buttonText="Sukurti vairuotojo skelbimą"
          onPress={() =>
            tabsNavigation.navigate(PageNames.BUSINESS_MY_DRIVER_AD)
          }
        />
      )}
      {!isLoading && driversList?.length > 0 && (
        <DriversList
          driversList={driversList}
          onPress={(id) =>
            navigation.navigate(PageNames.BUSINESS_MY_DRIVER_AD_OVERVIEW, {
              id,
            })
          }
        />
      )}
    </Container>
  );
};

export default DriversListScreen;
