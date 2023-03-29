import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import useUserData from "../hooks/useUserData";
import ProfileScreen from "../Views/Profile/ProfileScreen";

const Profile = () => {
  const Stack = createStackNavigator();
  const { token } = useUserData();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PageNames.PROFILE_OVERVIEW}
        children={() => <ProfileScreen token={token} />}
        options={{
          title: "Profilis",
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Profile;
