import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Constants/colors";
import Sizes from "../Constants/sizes";
import Inbox from "./Inbox";
import PageNames from "../Constants/pageNames";
import Profile from "./Profile";

const Tab = createMaterialBottomTabNavigator();

const BusinessUserTabs = ({
  route,
  navigation,
  unreadNotifications,
  id,
  token,
}) => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: Colors.WHITE }}
      activeColor={Colors.BLUE_400}
    >
      <Tab.Screen
        name={PageNames.INBOX}
        children={({ navigation: tabsNavigation }) => (
          <Inbox token={token} tabsNavigation={tabsNavigation} id={id} />
        )}
        options={{
          tabBarLabel: "Žinutės",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="notifications-outline"
              size={Sizes.ICON}
              color={color}
            />
          ),
          ...(unreadNotifications && { tabBarBadge: unreadNotifications }),
        }}
      />
      <Tab.Screen
        name={PageNames.PROFILE}
        component={Profile}
        options={{
          tabBarLabel: "Profilie",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={Sizes.ICON} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BusinessUserTabs;
