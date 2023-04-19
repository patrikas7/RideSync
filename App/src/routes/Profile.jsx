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
import ProfileVehicleScreen from "../Views/Profile/ProfileVehicleScreen";
import ProfileNewVehicleScreen from "../Views/Profile/ProfileNewVehicleScreen";
import { UserTypes } from "../Constants/types";

const Profile = ({ navigation }) => {
  const Stack = createStackNavigator();
  const { token, id, userType } = useUserData();

  const basicUserOverviewScreenOptions = {
    title: "Profilis",
    headerShadowVisible: false,
  };

  const businessUserOverviewScreenOptions = {
    headerShown: false,
  };

  const overviewScreenOptions =
    userType === UserTypes.BASIC_USER
      ? basicUserOverviewScreenOptions
      : businessUserOverviewScreenOptions;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PageNames.PROFILE_OVERVIEW}
        children={() => <ProfileScreen token={token} />}
        options={overviewScreenOptions}
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
        children={() => (
          <ProfileSettingsScreen mainNavigation={navigation} token={token} />
        )}
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
      <Stack.Screen
        name={PageNames.PROFILE_VEHICLE}
        children={() => <ProfileVehicleScreen token={token} id={id} />}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShadowVisible: false,
          title: "Mano automobiliai",
        }}
      />
      <Stack.Screen
        name={PageNames.PROFILE_NEW_VEHICLE}
        children={() => <ProfileNewVehicleScreen token={token} />}
        options={{
          headerShadowVisible: false,
          title: "Automobilio registracija",
        }}
      />
      <Stack.Screen
        name={PageNames.PROFILE_VEHICLE_EDIT}
        children={() => <ProfileNewVehicleScreen token={token} />}
        options={{
          headerShadowVisible: false,
          title: "Automobilio redagavimas",
        }}
      />
    </Stack.Navigator>
  );
};

export default Profile;
