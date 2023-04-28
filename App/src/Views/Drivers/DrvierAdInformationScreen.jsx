import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { fetchDriverAd } from "../../API/DriversApi";
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
    if (!isFocuesed || !token) return;
    getDriverAd();
  }, [token, isFocuesed]);

  const getDriverAd = async () => {
    setIsLoading(true);
    const response = await fetchDriverAd(token, id);
    if (!response?.error) setDriverAd(response.driverAd);
    setIsLoading(false);
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      {!isLoading && driverAd && (
        <MyDriverAd driverAd={driverAd} isMyAd={driverAd.isMyAd} />
      )}
    </Container>
  );
};

export default DrvierAdInformationScreen;
