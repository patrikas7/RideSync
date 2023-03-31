import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { registrationStore } from "../redux/registration/registrationStore";
import PageNames from "../Constants/pageNames";
import RegistrationScreen from "../Views/Registration/RegistrationScreen";

const Registration = ({ route, navigation }) => {
  const Stack = createStackNavigator();

  const defaulScreenOption = {
    title: "",
    headerShadowVisible: false,
  };

  return (
    <Provider store={registrationStore}>
      <Stack.Navigator>
        <Stack.Screen
          name={PageNames.REGISTRATION_NAME}
          children={() => (
            <RegistrationScreen
              route={{
                ...route,
                params: route.params,
                name: PageNames.REGISTRATION_NAME,
              }}
              mainNavigation={navigation}
            />
          )}
          options={defaulScreenOption}
        />
        <Stack.Screen
          name={PageNames.REGISTRATION_PASSWORD}
          children={({ route }) => (
            <RegistrationScreen route={route} mainNavigation={navigation} />
          )}
          options={defaulScreenOption}
        />
        <Stack.Screen
          name={PageNames.REGISTRATION_BIRTH}
          children={({ route }) => (
            <RegistrationScreen route={route} mainNavigation={navigation} />
          )}
          options={defaulScreenOption}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default Registration;
