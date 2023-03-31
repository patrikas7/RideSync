import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import LoginScreen from "./src/Views/Login/LoginScreen";
import RegistrationScreen from "./src/Views/Registration/RegistrationScreen";
import PageNames from "./src/Constants/pageNames";
import Colors from "./src/Constants/colors";
import Tabs from "./src/routes/Tabs";
import CitySearchScreen from "./src/Views/Search/CitySearchScreen";
import axios from "axios";
import FlashMessage from "react-native-flash-message";
import Trips from "./src/routes/Trips";
import SearchDateAndTimeScreen from "./src/Views/SearchDateAndTimeScreen/SearchDateAndTimeScreen";
import Profile from "./src/routes/Profile";
import SplashScreen from "./src/Views/SplashScreen";

axios.defaults.baseURL = "http://localhost:5001";

const Stack = createStackNavigator();

// Refactor registration into separate route
// Refactor registration to use global redux state

const defaulScreenOption = {
  title: "",
  headerShadowVisible: false,
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: {
              backgroundColor: Colors.WHITE,
            },
          }}
        >
          <Stack.Screen
            name={PageNames.SPLASH}
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={PageNames.LOGIN}
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={PageNames.HOME}
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={PageNames.REGISTRATION_NAME}
            component={RegistrationScreen}
            options={defaulScreenOption}
          />
          <Stack.Screen
            name={PageNames.REGISTRATION_PASSWORD}
            component={RegistrationScreen}
            options={defaulScreenOption}
          />
          <Stack.Screen
            name={PageNames.REGISTRATION_BIRTH}
            component={RegistrationScreen}
            options={defaulScreenOption}
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
            name={PageNames.TRIPS}
            component={Trips}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={PageNames.SEARCH_DATE_AND_TIME_SELECTION}
            component={SearchDateAndTimeScreen}
            options={{
              title: "Kelionės data ir laikas",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name={PageNames.PROFILE}
            component={Profile}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position={"bottom"} floating={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
