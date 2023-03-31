import { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import PageNames from "../Constants/pageNames";
import useUserData from "../hooks/useUserData";

const SplashScreen = ({ navigation }) => {
  const { id } = useUserData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id === undefined) return;
    setIsLoading(false);
    navigation.navigate(id ? PageNames.HOME : PageNames.LOGIN);
  }, [id]);

  return <Spinner visible={isLoading} />;
};

export default SplashScreen;
