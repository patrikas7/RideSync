import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Container from "../../../Components/Container/Container";
import NoResults from "../../../Components/NoResults/NoResults";
import useUserData from "../../../hooks/useUserData";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import FutureTripsList from "../../../Components/MyTrips/FutureTripsList";

const FutureTrips = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [futureTrips, setFutureTrips] = useState({});
  const isFocused = useIsFocused();
  const { token, id } = useUserData();

  useEffect(() => {
    if (!id || !token || !isFocused) return;
    const fetchFutureTrips = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/user/my-trips", {
          params: { id },
          headers: { Authorization: token },
        });

        setFutureTrips(data);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setIsLoading(false);
      }
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

  return (
    <Container>
      <Spinner visible={isLoading} />
      {!isLoading && !countTotalLength() ? (
        <NoResults
          primaryText="Jūs neturite jokių suplanuotų kelionių"
          secondaryText="Sukurkite naują kelionę arba užsirezervuokite vietą per kelionių paiešką"
          buttonText="Mano kelionių istorija"
        />
      ) : (
        <FutureTripsList
          driverTrips={futureTrips.driverTrips}
          passengerTrips={futureTrips.passengerTrips}
          tripSearchRequests={futureTrips.tripSearchRequests}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default FutureTrips;
