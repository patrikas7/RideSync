import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import TripsSearchResults from "../Views/Trips/TripsSearchResults/TripsSearchResults";
import TripInformationScreen from "../Views/Trips/TripInformation/TripInformationScreen";
import TripSearchFiltersScreen from "../Views/Trips/TripsSearchResults/TripSearchFiltersScreen";
import TripPassengersCount from "../Views/Trips/TripInformation/TripPassengersCountSelect";

const Trips = ({ route, navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PageNames.TRIP_SEARCH_RESULTS}
        children={() => <TripsSearchResults mainRoute={route} />}
        options={{
          title: "Paieškos rezultatai",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={PageNames.TRIP_INFORMATION}
        children={() => (
          <TripInformationScreen
            mainRoute={route}
            mainNavigation={navigation}
          />
        )}
        options={{
          title: "Kelionės informacija",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={PageNames.TRIP_SEARCH_FILTERS}
        component={TripSearchFiltersScreen}
        options={{
          title: "Paieškos filtrai",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={PageNames.TRIP_PASSENGERS_COUNT_SELECT}
        component={TripPassengersCount}
        options={{
          headerShadowVisible: false,
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default Trips;
