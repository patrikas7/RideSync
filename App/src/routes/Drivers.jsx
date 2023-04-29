import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import DriversListScreen from "../Views/Drivers/DriversListScreen";
import DrvierAdInformationScreen from "../Views/Drivers/DrvierAdInformationScreen";
import MyDriverAdFormScreen from "../Views/MyDriverAd/MyDriverAdFormScreen";

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
      <Stack.Screen
        children={() => <DrvierAdInformationScreen token={token} />}
        name={PageNames.BUSINESS_MY_DRIVER_AD_OVERVIEW}
        options={{
          headerShadowVisible: false,
          title: "Skelbimo informacija",
        }}
      />
      <Stack.Screen
        children={() => <MyDriverAdFormScreen token={token} />}
        name={PageNames.BUSINESS_MY_DRIVER_AD_EDIT}
        options={{
          headerShadowVisible: false,
          title: "Skelbimo redagavimas",
        }}
      />
    </Stack.Navigator>
  );
};

export default Drivers;
