import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { TripQueryTypes } from "../../../API/constants";
import { fetchMyTrips } from "../../../API/userApi";
import { FutureTripsStyles } from "../../../Components/MyTrips/MyTripsStyle";
import Container from "../../../Components/Container/Container";
import NoResults from "../../../Components/NoResults/NoResults";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import TripCard from "../../../Components/TripsList/TripCard";

const TripsHistoryScreen = ({ tabsNavigation }) => {
  const [tripsHistory, setTripsHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params;
  useScreenArrowBack(navigation, PageNames.TRIP_SEARCH_RESULTS);

  useEffect(() => {
    if (!token) return;
    const getTrips = async () => {
      const { data } = await fetchMyTrips(token, TripQueryTypes.HISTORY);
      if (data) setTripsHistory(data.trips);

      setIsLoading(false);
    };

    getTrips();
  }, [token]);

  return (
    <Container>
      {isLoading && <Spinner />}
      {!isLoading && tripsHistory.length === 0 && (
        <NoResults
          primaryText="Kelionių istorija yra tuščia"
          secondaryText={
            "Paskelbkite kelionę arba rezervuokite vietą vienoje iš esamų kelionių"
          }
          buttonText={"Į kelionių paiešką"}
          onPress={() => tabsNavigation.navigate(PageNames.SEARCH)}
        />
      )}
      {!isLoading && tripsHistory.length > 0 && (
        <FlatList
          data={tripsHistory}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <TripCard
              trip={item}
              onPress={(id) =>
                navigation.navigate(PageNames.TRIP_INFORMATION, {
                  id,
                  prevScreen: PageNames.TRIPS_HISTORY,
                })
              }
              containerStyling={
                index > 0
                  ? FutureTripsStyles.notFirstItem
                  : FutureTripsStyles.firstItem
              }
            />
          )}
        />
      )}
    </Container>
  );
};

export default TripsHistoryScreen;
