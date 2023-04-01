import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
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

const TripsSearchResults = ({ mainRoute }) => {
  const [activeSearchType, setActiveSearchType] = useState(0);
  const [panelVisible, setPanelVisible] = useState(false);
  const ref = useRef(null);
  const [hasTripSubscriptionBeenMade, setHasTripSubscriptionBeenMade] =
    useState(false);
  const { destination, departure, date, personsCount, token, id } =
    mainRoute.params;
  const navigation = useNavigation();
  const [tripsList, setTripsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useScreenArrowBack(navigation, PageNames.SEARCH);
  useScreenIconRight({
    navigation,
    icons: ["funnel-outline", "filter"],
    shouldRender: true,
    onPress: () =>
      navigation.navigate(PageNames.TRIP_SEARCH_FILTERS, {
        departure,
        destination,
        token,
      }),
  });

  useFocusEffect(
    useCallback(() => {
      fetchTrips();
    }, [])
  );

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
        <TripsList
          tripsList={tripsList}
          onPress={(id) =>
            navigation.navigate(PageNames.TRIP_INFORMATION, { id })
          }
        />
        <SlidingUpPanel
          ref={ref}
          visible={true}
          height={200}
          draggableRange={{ top: 200, bottom: 0 }}
          friction={0.5}
          snappingPoints={[0, 200]}
        >
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text style={{ fontSize: 24, padding: 16 }}>Sliding Up Panel</Text>
          </View>
        </SlidingUpPanel>
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
