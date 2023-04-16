import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { fetchMyTrips } from "../../../API/userApi";
import Container from "../../../Components/Container/Container";
import NoResults from "../../../Components/NoResults/NoResults";
import useUserData from "../../../hooks/useUserData";
import Spinner from "react-native-loading-spinner-overlay";
import FutureTripsList from "../../../Components/MyTrips/FutureTripsList";
import PageNames from "../../../Constants/pageNames";
import { TripQueryTypes } from "../../../API/constants";

const FutureTrips = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [futureTrips, setFutureTrips] = useState({});
  const isFocused = useIsFocused();
  const { token, id } = useUserData();

  useEffect(() => {
    if (!id || !token || !isFocused) return;

    const fetchFutureTrips = async () => {
      setIsLoading(true);
      const { data } = await fetchMyTrips(token, TripQueryTypes.FUTURE);
      setIsLoading(false);

      if (data) setFutureTrips(data);
    };

    fetchFutureTrips();
  }, [id, token, isFocused]);

  const countTotalLength = () => {
    let totalLength = 0;

    for (let key in futureTrips) {
      totalLength += futureTrips[key].length;
    }

    return totalLength;
  };

  const handleOnHistoryPress = () => {
    navigation.navigate(PageNames.TRIPS_HISTORY, { token });
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      {!isLoading && !countTotalLength() ? (
        <NoResults
          primaryText="Jūs neturite jokių suplanuotų kelionių"
          secondaryText="Sukurkite naują kelionę arba užsirezervuokite vietą per kelionių paiešką"
          buttonText="Mano kelionių istorija"
          onPress={handleOnHistoryPress}
        />
      ) : (
        <FutureTripsList
          driverTrips={futureTrips.driverTrips}
          passengerTrips={futureTrips.passengerTrips}
          tripSearchRequests={futureTrips.tripSearchRequests}
          onTripPress={(id, screen) => navigation.navigate(screen, { id })}
          onHistoryPress={handleOnHistoryPress}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default FutureTrips;
