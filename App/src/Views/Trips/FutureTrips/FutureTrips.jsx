import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Container from "../../../Components/Container/Container";
import NoResults from "../../../Components/NoResults/NoResults";
import useUserData from "../../../hooks/useUserData";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";

const FutureTrips = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [futureTrips, setFutureTrips] = useState([]);
  const { token, id } = useUserData();

  useEffect(() => {
    if (!id || !token) return;
    fetchFutureTrips();
  }, [id, token]);

  const fetchFutureTrips = async () => {
    try {
      const { data } = await axios.get("/trips/my-trips/future-trips", {
        params: { id },
        headers: { Authorization: token },
      });

      setFutureTrips(data?.trips);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <NoResults
        primaryText="Jūs neturite jokių suplanuotų kelionių"
        secondaryText="Sukurkite naują kelionę arba užsirezervuokite vietą per kelionių paiešką"
        buttonText="Mano kelionių istorija"
      />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default FutureTrips;
