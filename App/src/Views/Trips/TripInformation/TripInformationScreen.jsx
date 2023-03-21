import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../../../Components/Container/Container";
import TripInformation from "../../../Components/TripInformation/TripInformation";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import useUserData from "../../../hooks/useUserData";
import Spinner from "react-native-loading-spinner-overlay";

const TripInformationScreen = ({ navigation, route }) => {
  const [trip, setTrip] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;
  const { token } = useUserData();
  useScreenArrowBack(navigation, PageNames.TRIP_SEARCH_RESULTS);

  useEffect(() => {
    if (!id || !token) return;
    fetchTrip();
  }, [id, token]);

  const fetchTrip = async () => {
    try {
      const { data } = await axios.get("/trips/information", {
        params: { id },
        headers: { Authorization: token },
      });

      console.log(data);
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
        <TripInformation trip={trip} />
      )}
    </Container>
  );
};

export default TripInformationScreen;
