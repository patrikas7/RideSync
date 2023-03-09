import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import PublishLocationSearchScreen from "../Views/Publish/PublishLocationSearchScreen";

const Publish = ({ navigation, route, tabNavigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PageNames.PUBLISH_DEPARTURE_SEARCH}
        children={(props) => (
          <PublishLocationSearchScreen
            navigation={navigation}
            route={route}
            tabNavigation={tabNavigation}
            publishNavigation={props.navigation}
            nextScreen={PageNames.PUBLISH_DESTINATION_SEARCH}
          />
        )}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PageNames.PUBLISH_DESTINATION_SEARCH}
        children={(props) => (
          <PublishLocationSearchScreen
            navigation={navigation}
            route={route}
            tabNavigation={tabNavigation}
            publishNavigation={props.navigation}
            nextScreen={PageNames.PUBLISH_DESTINATION_SEARCH}
          />
        )}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Publish;
