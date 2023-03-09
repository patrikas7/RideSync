import axios from "axios";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Container from "../../../Components/Container/Container";
import NoResults from "../../../Components/NoResults/NoResults";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import TripsSearchResultsStyle from "./TripsSearchResultsStyle";

const TripsSearchResults = ({ navigation, route }) => {
  const { destination, departure, date, personsCount, token } = route.params;
  const [tripsList, setTripsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useScreenArrowBack(navigation, PageNames.SEARCH);

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
      {!isLoading && !tripsList.length && (
        <NoResults
          containerStyling={TripsSearchResultsStyle.noResultsContainer}
          primaryText="Nerasta jokių kelionių pagal paieškos kriterijus"
          secondaryText="Atnaujinkite paiešką arba užprenumeruokite pranešimą, kai atitinkama kelionė bus galima"
          buttonText="Užpenumeruoti kelionėss pranešimą"
        />
      )}
    </Container>
  );
};

export default TripsSearchResults;
