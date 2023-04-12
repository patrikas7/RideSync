import { useState, useEffect } from "react";
import { View } from "react-native";
import { printError } from "../../../Utils/utils";
import useUserData from "../../../hooks/useUserData";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import axios from "axios";
import Container from "../../../Components/Container/Container";

const TripSearchRequestInformationScreen = ({ navigation, route }) => {
  const [tripSearchRequest, setTripSearchRequest] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;
  const { token } = useUserData();
  useScreenArrowBack(navigation, PageNames.TRIP_SEARCH_RESULTS);

  useEffect(() => {
    if (!id || !token) return;

    const fetchTripSearchRequest = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/trip-search-requests/${id}`, {
          headers: { Authorization: token },
        });

        console.log(data);
        setTripSearchRequest(data.tripSearchRequest);
      } catch (error) {
        printError(error);
      }

      setIsLoading(false);
    };

    fetchTripSearchRequest();
  }, [id, token]);

  console.log(tripSearchRequest);
  return <Container></Container>;
};

export default TripSearchRequestInformationScreen;
