import axios from "axios";
import { useEffect, useState } from "react";
import { isDateInPast } from "../../../Utils/utils";
import Container from "../../../Components/Container/Container";
import TripInformation from "../../../Components/TripInformation/TripInformation";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import useUserData from "../../../hooks/useUserData";
import Spinner from "react-native-loading-spinner-overlay";
import useScreenIconRight from "../../../hooks/useScreenIconRight";
import Colors from "../../../Constants/colors";

const TripInformationScreen = ({ navigation, route }) => {
  const [trip, setTrip] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id, prevScreen = PageNames.TRIP_SEARCH_RESULTS } = route.params;
  const { token, id: userId } = useUserData();
  const hasTripFinished = isDateInPast(trip?.date);
  useScreenArrowBack(navigation, prevScreen);

  const handleOnEditPress = () => {
    navigation.navigate(PageNames.TRIP_EDIT, {
      trip,
      token,
      id: userId,
      prevScreen: PageNames.TRIP_INFORMATION,
    });
  };

  useScreenIconRight({
    navigation,
    icons: ["create-outline"],
    onPress: handleOnEditPress,
    shouldRender: trip.isUserDriver && !hasTripFinished,
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
          hasTripFinished={hasTripFinished}
          id={id}
          token={token}
          navigation={navigation}
          setTrip={setTrip}
          userId={userId}
        />
      )}
    </Container>
  );
};

export default TripInformationScreen;
