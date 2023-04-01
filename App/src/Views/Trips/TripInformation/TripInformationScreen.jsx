import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../../../Components/Container/Container";
import TripInformation from "../../../Components/TripInformation/TripInformation";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import useUserData from "../../../hooks/useUserData";
import Spinner from "react-native-loading-spinner-overlay";
import useScreenIconRight from "../../../hooks/useScreenIconRight";
import Colors from "../../../Constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";

const TripInformationScreen = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [trip, setTrip] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;
  const { token } = useUserData();
  useScreenArrowBack(navigation, PageNames.TRIP_SEARCH_RESULTS);

  const handleOnEditPress = () => {
    console.log("test");
  };

  useScreenIconRight({
    navigation,
    icons: ["create-outline"],
    onPress: handleOnEditPress,
    shouldRender: trip.isUserDriver,
    color: Colors.BLACK,
  });

  useEffect(() => {
    if (!id || !token) return;
    fetchTrip();
  }, [id, token]);

  useEffect(() => {
    if (!route.params?.trip) return;
    setTrip(route.params?.trip);
  }, [route.params?.trip]);

  const fetchTrip = async () => {
    try {
      const { data } = await axios.get("/trips/information", {
        params: { id },
        headers: { Authorization: token },
      });

      setTrip(data.trip);
    } catch (error) {
      console.log(error.response.data);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <TripInformation
          trip={trip}
          id={id}
          token={token}
          navigation={navigation}
        />
      )}
    </Container>
  );
};

export default TripInformationScreen;
