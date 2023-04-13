import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import FutureTrips from "../Views/Trips/FutureTrips/FutureTrips";
import TripInformationScreen from "../Views/Trips/TripInformation/TripInformationScreen";
import TripSearchRequestInformationScreen from "../Views/Trips/TripInformation/TripSearchRequestInformationScreen";
import UserInformation from "../Views/Trips/TripInformation/UserInformation";
import ChatScreen from "../Views/Chat/ChatScreen";
import TripEditScreen from "../Views/Trips/TripInformation/TripEditScreen";
import CitySearchScreen from "../Views/Search/CitySearchScreen";
import TripDateAndTimeEditScreen from "../Views/Trips/TripInformation/TripDateAndTimeEditScreen";

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
      <Stack.Screen
        name={PageNames.TRIP_SEARCH_REQUEST_INFORMATION}
        component={TripSearchRequestInformationScreen}
        options={{
          title: "Kelionės paieškos užklausa",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={PageNames.USER_INFORMATION}
        component={UserInformation}
        options={{
          headerShadowVisible: false,
          title: "Profilis",
        }}
      />
      <Stack.Screen
        name={PageNames.CHAT}
        component={ChatScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name={PageNames.TRIP_EDIT}
        component={TripEditScreen}
        options={{
          headerShadowVisible: false,
          title: "Kelionės redagavimas",
        }}
      />
      <Stack.Screen
        name={PageNames.CITY_SEARCH}
        component={CitySearchScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name={PageNames.TRIP_DATE_AND_TIME_EDIT}
        component={TripDateAndTimeEditScreen}
        options={{
          headerShadowVisible: false,
          title: "",
        }}
      />
      <Stack.Screen
        name={PageNames.TRIP_RETURN_DATE_AND_TIME_EDIT}
        component={TripDateAndTimeEditScreen}
        options={{
          headerShadowVisible: false,
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default MyRides;
