import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import MyDriverAdFormScreen from "../Views/MyDriverAd/MyDriverAdFormScreen";
import MyDriverAdOverviewScreen from "../Views/MyDriverAd/MyDriverAdOverviewScreen";

const MyDriverAd = ({ token }) => {
  const navigation = useNavigation();
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        children={() => (
          <MyDriverAdOverviewScreen token={token} tabsNavigation={navigation} />
        )}
        name={PageNames.BUSINESS_MY_DRIVER_AD_OVERVIEW}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        children={() => <MyDriverAdFormScreen token={token} />}
        name={PageNames.BUSINESS_MY_DRIVER_AD_FORM}
        options={{ title: "Vairuotojo skelbimas", headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default MyDriverAd;
