import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import DriversList from "../Views/Drivers/DriversList";

const Drivers = ({ token }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        children={() => <DriversList token={token} />}
        name={PageNames.BUSINESS_DRIVERS_LIST}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Drivers;
