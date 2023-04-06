import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import InboxScreen from "../Views/Inbox/InboxScreen";

const Inbox = ({ token }) => {
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
    </Stack.Navigator>
  );
};

export default Inbox;
