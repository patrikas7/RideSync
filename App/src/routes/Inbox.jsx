import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import InboxScreen from "../Views/Inbox/InboxScreen";
import NotificationInformationScreen from "../Views/Inbox/NotificationInformationScreen";

const Inbox = ({ token, tabsNavigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PageNames.INBOX_LIST}
        children={() => <InboxScreen token={token} />}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PageNames.TRIP_WAS_EDITED_NOTIFICATION}
        children={() => (
          <NotificationInformationScreen
            token={token}
            tabsNavigation={tabsNavigation}
          />
        )}
        options={{
          headerShadowVisible: false,
          title: "Pranešimo informacija",
        }}
      />
    </Stack.Navigator>
  );
};

export default Inbox;
