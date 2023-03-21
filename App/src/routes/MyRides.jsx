import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import FutureTrips from "../Views/Trips/FutureTrips/FutureTrips";
import TripInformationScreen from "../Views/Trips/TripInformation/TripInformationScreen";

const MyRides = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PageNames.TRIP_SEARCH_RESULTS}
        component={FutureTrips}
        options={{
          headerShown: false,
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

export default MyRides;
