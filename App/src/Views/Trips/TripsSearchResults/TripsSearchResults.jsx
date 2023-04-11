import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { showMessage } from "react-native-flash-message";
import Spinner from "react-native-loading-spinner-overlay";
import ButtonsSwitch from "../../../Components/ButtonsSwitch/ButtonsSwitch";
import Container from "../../../Components/Container/Container";
import NoResults from "../../../Components/NoResults/NoResults";
import Success from "../../../Components/Success/Success";
import TripsList from "../../../Components/TripsList/TripsList";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import useScreenIconRight from "../../../hooks/useScreenIconRight";
import SlidingUpPanel from "rn-sliding-up-panel";
import { printError } from "../../../Utils/utils";
import TripSearchRequestList from "../../../Components/TripsList/TripSearchRequestsList";

const TripsSearchResults = ({ mainRoute }) => {
  const [activeSearchType, setActiveSearchType] = useState(0);
  const [panelVisible, setPanelVisible] = useState(false);
  const [filters, setFilteres] = useState({});
  const ref = useRef(null);
  const [hasTripSubscriptionBeenMade, setHasTripSubscriptionBeenMade] =
    useState(false);
  const { destination, departure, date, personsCount, token, id } =
    mainRoute.params;
  const navigation = useNavigation();
  const route = useRoute();
  const [tripsList, setTripsList] = useState([]);
  const [tripSearchRequests, setTripSearchRequests] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useScreenArrowBack(navigation, PageNames.SEARCH);
  useScreenIconRight({
    navigation,
    icons: ["funnel-outline", "filter"],
    shouldRender: true,
    dependency: filters,
    onPress: () =>
      navigation.navigate(PageNames.TRIP_SEARCH_FILTERS, {
        departure,
        destination,
        token,
        filters,
      }),
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    if (!activeSearchType || tripSearchRequests) return;
    const fetchTripSearchRequests = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/trip-search-requests", {
          params: {
            destination: destination?.city,
            departure: departure?.city,
            date,
            passengersCount: personsCount,
          },
          headers: { Authorization: token },
        });

        setTripSearchRequests(data.tripSearchRequests);
      } catch (error) {
        printError(error);
      }

      setIsLoading(false);
    };

    fetchTripSearchRequests();
  }, [activeSearchType]);

  useEffect(() => {
    if (!route.params?.query) return;
    const query = route.params.query;

    setFilteres(query);
    filterTrips(query);
  }, [route.params?.query]);

  const fetchTrips = async () => {
    if (route.params?.query) return;

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
      printError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTrips = async (query) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/trips/filter", {
        params: {
          ...query,
          destination: destination?.city,
          departure: departure?.city,
          date,
        },
        headers: { Authorization: token },
      });

      setTripsList(data.trips);
    } catch (error) {
      printError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubscriptionClick = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        "/tripSubscriptions",
        {
          id,
          departureCity: departure.city,
          destinationCity: destination.city,
          date,
          personsCount: personsCount || null,
        },
        {
          headers: { Authorization: token },
        }
      );

      setHasTripSubscriptionBeenMade(true);
    } catch (error) {
      showMessage({
        message: error.response.data,
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log(tripSearchRequests);

  const renderResults = () =>
    !isLoading && !tripsList.length ? (
      <NoResults
        primaryText="Nerasta jokių kelionių pagal paieškos kriterijus"
        secondaryText="Atnaujinkite paiešką arba užprenumeruokite pranešimą, kai atitinkama kelionė bus galima"
        buttonText="Užpenumeruoti kelionės pranešimą"
        onPress={handleOnSubscriptionClick}
      />
    ) : (
      <View style={{ flex: 1 }}>
        {!activeSearchType ? (
          <TripsList
            tripsList={tripsList}
            onPress={(id) =>
              navigation.navigate(PageNames.TRIP_INFORMATION, { id })
            }
          />
        ) : (
          <TripsList
            tripsList={tripSearchRequests}
            onPress={(id) =>
              navigation.navigate(PageNames.TRIP_INFORMATION, { id })
            }
          />
        )}
      </View>
    );

  return (
    <Container>
      <ButtonsSwitch
        leftButtonText="Vairuotojai"
        rightButtonText="Keleiviai"
        onPress={(index) => setActiveSearchType(index)}
      />
      <Spinner visible={isLoading} />
      {hasTripSubscriptionBeenMade ? (
        <Success
          primaryText="Pranešimas kelionę užprenumeruotas"
          secondaryText="Tik atsiradus kelionei, būsite informuoti programelės ir gausite pranešimą į el. paštą"
          buttonText="Į kelionių paiešką"
          onPress={() => navigation.navigate(PageNames.SEARCH)}
        />
      ) : (
        renderResults()
      )}
    </Container>
  );
};

export default TripsSearchResults;
