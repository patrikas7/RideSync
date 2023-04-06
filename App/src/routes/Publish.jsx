import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import PageNames from "../Constants/pageNames";
import PublishDepartureScreen from "../Views/Publish/PublishDepartureScreen";
import PublishDestinationScreen from "../Views/Publish/PublishDestinationScreen";
import { publishStore } from "../redux/publish/publishStore";
import PublishInformationScreen from "../Views/Publish/PublishInformationScreen";
import PublishStopsScreen from "../Views/Publish/PublishStopsScreen";
import PublishDateAndTimeScreen from "../Views/Publish/PublishDateAndTimeScreen";
import PublishStopEditScreen from "../Views/Publish/PublishStopEditScreen";
import PublishRouteConfirmationScreen from "../Views/Publish/PublishRouteConfirmationScreen";
import PublishInformationConfirmationScreen from "../Views/Publish/PublishInformationConfirmationScreen";
import PublishSuccessPage from "../Views/Publish/PublishSuccessScreen";

const screenOptions = {
  title: "",
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
};

const Publish = ({ navigation, route }) => {
  const Stack = createStackNavigator();

  return (
    <Provider store={publishStore}>
      <Stack.Navigator>
        <Stack.Screen
          name={PageNames.PUBLISH_DEPARTURE_SEARCH}
          children={() => (
            <PublishDepartureScreen navigation={navigation} route={route} />
          )}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={PageNames.PUBLISH_DESTINATION_SEARCH}
          children={() => (
            <PublishDestinationScreen navigation={navigation} route={route} />
          )}
          options={screenOptions}
        />
        <Stack.Screen
          name={PageNames.PUBLISH_STOPS}
          children={() => (
            <PublishStopsScreen mainNavigation={navigation} mainRoute={route} />
          )}
          options={screenOptions}
        />
        <Stack.Screen
          name={PageNames.PUBLISH_STOP_EDIT}
          children={() => (
            <PublishStopEditScreen
              mainNavigation={navigation}
              mainRoute={route}
            />
          )}
          options={screenOptions}
        />
        <Stack.Screen
          name={PageNames.PUBLISH_DATE_AND_TIME}
          children={() => <PublishDateAndTimeScreen />}
          options={screenOptions}
        />
        <Stack.Screen
          name={PageNames.PUBLISH_INFORMATION}
          children={() => <PublishInformationScreen />}
          options={screenOptions}
        />
        <Stack.Screen
          name={PageNames.PUBLISH_RETURN_DATE_AND_TIME}
          children={() => <PublishDateAndTimeScreen isReturn={true} />}
          options={screenOptions}
        />
        <Stack.Screen
          name={PageNames.PUBLISH_ROUTE_CONFIRMATION}
          children={() => <PublishRouteConfirmationScreen />}
          options={screenOptions}
        />
        <Stack.Screen
          name={PageNames.PUBLISH_INFORMATION_CONFIRMATION}
          children={() => <PublishInformationConfirmationScreen />}
          options={screenOptions}
        />
        <Stack.Screen
          name={PageNames.PUBLISH_SUCCES}
          component={PublishSuccessPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default Publish;
