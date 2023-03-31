import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import useUserData from "../hooks/useUserData";
import ProfileDateEditScreen from "../Views/Profile/ProfileDateEditScreen";
import ProfileDetailsScreen from "../Views/Profile/ProfileDetailsScreen";
import ProfileGenderEditScreen from "../Views/Profile/ProfileGenderEditScreen";
import ProfileScreen from "../Views/Profile/ProfileScreen";
import ProfileValueEditScreen from "../Views/Profile/ProfileValueEditScreen";
import ProfileSettingsScreen from "../Views/Profile/ProfileSettingsScreen";
import ProfilePictureEditScren from "../Views/Profile/ProfilePictureEditScreen";

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
        component={ProfileDetailsScreen}
        options={{
          title: "Profilio detalės",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={PageNames.PROFILE_SETTINGS}
        children={() => <ProfileSettingsScreen token={token} />}
        options={{
          title: "Nustatymai",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={PageNames.PROFILE_PICTURE_EDIT}
        children={() => <ProfilePictureEditScren token={token} />}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShadowVisible: false,
          title: "",
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
      <Stack.Screen
        name={PageNames.PROFILE_BIRTHDATE_EDIT}
        children={() => <ProfileDateEditScreen token={token} />}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShadowVisible: false,
          title: "",
        }}
      />
      <Stack.Screen
        name={PageNames.PROFILE_GENDER_EDIT}
        children={() => <ProfileGenderEditScreen token={token} />}
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
