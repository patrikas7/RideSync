import { useState, useEffect } from "react";
import { fetchUserCars } from "../../API/userApi";
import { StyleSheet, View } from "react-native";
import Container from "../../Components/Container/Container";
import Spinner from "react-native-loading-spinner-overlay/lib";
import NoResults from "../../Components/NoResults/NoResults";
import PageNames from "../../Constants/pageNames";
import { useIsFocused } from "@react-navigation/native";

const MyDriverAdOverviewScreen = ({ token, tabsNavigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasUserCars, setHasUserCars] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!token || !isFocused) return;
    const getUserCars = async () => {
      const { carsList, error } = await fetchUserCars(token);

      if (!error) setHasUserCars(!!carsList.length);
      setIsLoading(false);
    };

    getUserCars();
  }, [token, isFocused]);

  return (
    <Container>
      <Spinner visible={isLoading} />
      {!isLoading && !hasUserCars && (
        <NoResults
          primaryText="Jus neturite jokių užregistruotų automobilių"
          secondaryText="Užregistruokite automobilį, kad galėtumėt skelbti vairuotojo paslaugų skelbimą"
          buttonText="Automobilio registracija"
          onPress={() => tabsNavigation.navigate(PageNames.PROFILE)}
        />
      )}
    </Container>
  );
};

export default MyDriverAdOverviewScreen;
