import { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { fetchUserCars, fetchUserDriverAds } from "../../API/userApi";
import Container from "../../Components/Container/Container";
import Spinner from "react-native-loading-spinner-overlay/lib";
import NoResults from "../../Components/NoResults/NoResults";
import PageNames from "../../Constants/pageNames";
import MyDriverAd from "../../Components/DriverAd/MyDriverAd";

const MyDriverAdOverviewScreen = ({ token, tabsNavigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCars, setUserCars] = useState([]);
  const [driverAds, setDriverAds] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (!token || !isFocused) return;
    const getUserCars = async () => {
      const { carsList, error } = await fetchUserCars(token);

      if (!error) {
        setUserCars(carsList);
        if (carsList.length > 0) {
          const { driverAds } = await fetchUserDriverAds(token);
          setDriverAds(driverAds);
        }
      }
      setIsLoading(false);
    };

    getUserCars();
  }, [token, isFocused]);

  return (
    <Container>
      <Spinner visible={isLoading} />
      {!isLoading && !userCars.length && (
        <NoResults
          primaryText="Jus neturite jokių užregistruotų automobilių"
          secondaryText="Užregistruokite automobilį, kad galėtumėt skelbti vairuotojo paslaugų skelbimą"
          buttonText="Automobilio registracija"
          onPress={() => tabsNavigation.navigate(PageNames.PROFILE)}
        />
      )}
      {!isLoading && userCars.length && !driverAds.length && (
        <NoResults
          primaryText="Jus neturite jokių skelbimo"
          secondaryText="Sukurkite naują vairuotojo paslaugos skelbimą"
          buttonText="Vairuotojo skelbimas"
          onPress={() =>
            navigation.navigate(PageNames.BUSINESS_MY_DRIVER_AD_FORM, {
              userCars,
            })
          }
        />
      )}
      {!isLoading && driverAds?.length > 0 && (
        <MyDriverAd
          driverAd={driverAds[0]}
          onPress={() =>
            navigation.navigate(PageNames.BUSINESS_MY_DRIVER_AD_FORM, {
              driverAd: driverAds[0],
              userCars,
            })
          }
        />
      )}
    </Container>
  );
};

export default MyDriverAdOverviewScreen;
