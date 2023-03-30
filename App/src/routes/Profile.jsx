import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import useUserData from "../hooks/useUserData";
import ProfileDetailsScreen from "../Views/Profile/ProfileDetailsScreen";
import ProfileScreen from "../Views/Profile/ProfileScreen";
import ProfileValueEditScreen from "../Views/Profile/ProfileValueEditScreen";

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
      <Stack.Screen
        name={PageNames.PROFILE_DETAILS}
        children={() => <ProfileDetailsScreen token={token} />}
        options={{
          title: "Profilio detalės",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={PageNames.PROFILE_VALUE_EDIT}
        children={() => <ProfileValueEditScreen token={token} />}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShadowVisible: false,
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default Profile;
