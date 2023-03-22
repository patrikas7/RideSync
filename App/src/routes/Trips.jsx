import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import TripsSearchResults from "../Views/Trips/TripsSearchResults/TripsSearchResults";
import TripInformationScreen from "../Views/Trips/TripInformation/TripInformationScreen";
import TripSearchFiltersScreen from "../Views/Trips/TripsSearchResults/TripSearchFiltersScreen";

const Trips = ({ route }) => {
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
        component={TripInformationScreen}
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
    </Stack.Navigator>
  );
};

export default Trips;
