import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import DriversListScreen from "../Views/Drivers/DriversListScreen";

const Drivers = ({ token }) => {
  const navigation = useNavigation();
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        children={() => (
          <DriversListScreen token={token} tabsNavigation={navigation} />
        )}
        name={PageNames.BUSINESS_DRIVERS_LIST}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Drivers;
