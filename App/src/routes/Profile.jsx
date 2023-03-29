import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import ProfileScreen from "../Views/Profile/ProfileScreen";

const Profile = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PageNames.PROFILE_OVERVIEW}
        component={ProfileScreen}
        options={{
          title: "Profilis",
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Profile;
