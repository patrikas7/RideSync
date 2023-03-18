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
import { useEffect, useState } from "react";
import useUserData from "./src/hooks/useUserData";
import Spinner from "react-native-loading-spinner-overlay";
import FlashMessage from "react-native-flash-message";
import Trips from "./src/routes/Trips";

axios.defaults.baseURL = "http://localhost:5001";

const Stack = createStackNavigator();

// Refactor registration into separate route
// Refactor registration to use global redux state

const defaulScreenOption = {
  title: "",
  headerShadowVisible: false,
};

export default function App() {
  const { id } = useUserData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id === undefined) return;
    setIsLoading(false);
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              cardStyle: {
                backgroundColor: Colors.WHITE,
              },
            }}
          >
            {!id ? (
              <Stack.Screen
                name={PageNames.LOGIN}
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
            ) : (
              <Stack.Screen
                name={PageNames.HOME}
                component={Tabs}
                options={{
                  headerShown: false,
                }}
              />
            )}
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
          </Stack.Navigator>
        </NavigationContainer>
      )}
      <FlashMessage position={"bottom"} floating={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
