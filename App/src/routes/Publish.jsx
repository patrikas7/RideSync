import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import PageNames from "../Constants/pageNames";
import PublishDepartureScreen from "../Views/Publish/PublishDepartureScreen";
import PublishDestinationScreen from "../Views/Publish/PublishDestinationScreen";
import { publishStore } from "../redux/publish/publishStore";

// ADD ERROR TO DESTINATION IF CYTIES ARE THE SAME

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
          options={{
            title: "",
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default Publish;
