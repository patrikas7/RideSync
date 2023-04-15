import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import InboxScreen from "../Views/Inbox/InboxScreen";
import NotificationInformationScreen from "../Views/Inbox/NotificationInformationScreen";
import ChatScreen from "../Views/Chat/ChatScreen";

const Inbox = ({ token, id, tabsNavigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PageNames.INBOX_LIST}
        children={() => <InboxScreen token={token} id={id} />}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PageNames.NOTIFICATION_INFO}
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
      <Stack.Screen
        name={PageNames.CHAT}
        component={ChatScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default Inbox;
