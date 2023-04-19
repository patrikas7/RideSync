import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PageNames from "../Constants/pageNames";
import Sizes from "../Constants/sizes";
import SearchScreen from "../Views/Search/SearchScreen";
import Publish from "./Publish";
import MyRides from "./MyRides";
import Bookmarks from "./Bookmarks";
import Inbox from "./Inbox";
import Colors from "../Constants/colors";

const Tab = createMaterialBottomTabNavigator();

const BasicUserTabs = ({
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
        name={PageNames.SEARCH}
        children={() => (
          <SearchScreen
            navigation={navigation}
            route={route}
            id={id}
            token={token}
          />
        )}
        options={{
          tabBarLabel: "Paieška",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" color={color} size={Sizes.ICON} />
          ),
        }}
      />
      <Tab.Screen
        name={PageNames.PUBLISH}
        children={() => <Publish navigation={navigation} route={route} />}
        options={{
          tabBarLabel: "Skelbti",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="add-circle-outline"
              size={Sizes.ICON}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={PageNames.MY_RIDES}
        component={MyRides}
        options={{
          tabBarLabel: "Kelionės",
          tabBarIcon: ({ color }) => (
            <Ionicons name="car-outline" size={Sizes.ICON} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={PageNames.BOOKMARKS}
        children={() => <Bookmarks token={token} />}
        options={{
          tabBarLabel: "Išsaugoti",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmark-outline" size={Sizes.ICON} color={color} />
          ),
        }}
      />
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
    </Tab.Navigator>
  );
};

export default BasicUserTabs;
