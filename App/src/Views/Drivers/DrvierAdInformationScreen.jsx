import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { fetchDriverAd } from "../../API/DriversApi";
import { fetchUserCars } from "../../API/userApi";
import Container from "../../Components/Container/Container";
import MyDriverAd from "../../Components/DriverAd/MyDriverAd";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";

const DrvierAdInformationScreen = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [driverAd, setDriverAd] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const isFocuesed = useIsFocused();
  const { id } = route.params;

  useScreenArrowBack(navigation, PageNames.BUSINESS_DRIVERS_LIST);

  useEffect(() => {
    if (!isFocuesed || !token || !id) return;
    getDriverAd();
  }, [token, isFocuesed, id]);

  const getDriverAd = async () => {
    setIsLoading(true);
    const response = await fetchDriverAd(token, id);
    if (!response?.error) setDriverAd(response.driverAd);
    setIsLoading(false);
  };

  const handleOnEditPress = async () => {
    setIsLoading(true);
    const response = await fetchUserCars(token);
    setIsLoading(false);
    if (!response?.error)
      navigation.navigate(PageNames.BUSINESS_MY_DRIVER_AD_EDIT, {
        driverAd,
        userCars: response.carsList,
        prevScreen: PageNames.BUSINESS_MY_DRIVER_AD_OVERVIEW,
      });
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      {!isLoading && driverAd && (
        <MyDriverAd
          driverAd={driverAd}
          isMyAd={driverAd.isMyAd}
          onPress={handleOnEditPress}
        />
      )}
    </Container>
  );
};

export default DrvierAdInformationScreen;
