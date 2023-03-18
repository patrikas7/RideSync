import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import Container from "../../../Components/Container/Container";
import NoResults from "../../../Components/NoResults/NoResults";
import TripsList from "../../../Components/TripsList/TripsList";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";

const TripsSearchResults = ({ mainNavigation, mainRoute }) => {
  const { destination, departure, date, personsCount, token } =
    mainRoute.params;

  const navigation = useNavigation();
  const [tripsList, setTripsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useScreenArrowBack(navigation, PageNames.SEARCH);

  console.log(navigation.getState());
  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const { data } = await axios.get("/trips", {
        params: {
          destination: destination?.city,
          departure: departure?.city,
          date,
          personsCount,
        },
        headers: { Authorization: token },
      });

      setTripsList(data?.trips);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      {!isLoading &&
        (!tripsList.length ? (
          <NoResults
            primaryText="Nerasta jokių kelionių pagal paieškos kriterijus"
            secondaryText="Atnaujinkite paiešką arba užprenumeruokite pranešimą, kai atitinkama kelionė bus galima"
            buttonText="Užpenumeruoti kelionės pranešimą"
          />
        ) : (
          <TripsList tripsList={tripsList} />
        ))}
    </Container>
  );
};

export default TripsSearchResults;
