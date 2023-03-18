import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import TripsSearchResults from "../Views/Trips/TripsSearchResults/TripsSearchResults";
import TripInformationScreen from "../Views/Trips/TripInformation/TripInformationScreen";

const Trips = ({ navigation, route }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PageNames.TRIP_SEARCH_RESULTS}
        children={() => (
          <TripsSearchResults mainNavigation={navigation} mainRoute={route} />
        )}
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
    </Stack.Navigator>
  );
};

export default Trips;
