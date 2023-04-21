import { useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import MyDriverAdFormScreen from "../Views/MyDriverAd/MyDriverAdFormScreen";
import MyDriverAdOverviewScreen from "../Views/MyDriverAd/MyDriverAdOverviewScreen";
import MyDriverAdSuccessScreen from "../Views/MyDriverAd/MyDriverAdSuccessScreen";
import CitySearchScreen from "../Views/Search/CitySearchScreen";

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
      <Stack.Screen
        component={CitySearchScreen}
        name={PageNames.CITY_SEARCH}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        component={MyDriverAdSuccessScreen}
        name={PageNames.PUBLISH_SUCCES}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyDriverAd;
