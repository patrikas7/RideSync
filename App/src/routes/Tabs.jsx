import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet } from "react-native";
import Colors from "../Constants/colors";
import PageNames from "../Constants/pageNames";
import Sizes from "../Constants/sizes";
import BookmarksScreen from "../Views/Bookmarks/BookmarksScreen";
import SearchScreen from "../Views/Search/SearchScreen";
import FutureTrips from "../Views/Trips/FutureTrips/FutureTrips";
import Publish from "./Publish";

const Tab = createMaterialBottomTabNavigator();

const Tabs = ({ route, navigation }) => {
  return (
    <Tab.Navigator barStyle={styles.barStyle} activeColor={Colors.BLUE_400}>
      <Tab.Screen
        name={PageNames.SEARCH}
        children={(props) => (
          <SearchScreen
            navigation={navigation}
            route={route}
            tabNavigation={props.navigation}
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
        children={(props) => (
          <Publish
            navigation={navigation}
            route={route}
            tabNavigation={props.navigation}
          />
        )}
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
        component={FutureTrips}
        options={{
          tabBarLabel: "Kelionės",
          tabBarIcon: ({ color }) => (
            <Ionicons name="car-outline" size={Sizes.ICON} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={PageNames.SAVED_RIDES}
        children={BookmarksScreen}
        options={{
          tabBarLabel: "Išsaugoti",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmark-outline" size={Sizes.ICON} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={PageNames.INBOX}
        component={SearchScreen}
        options={{
          tabBarLabel: "Žinutės",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="notifications-outline"
              size={Sizes.ICON}
              color={color}
            />
          ),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
};

Tabs.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Tabs;

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: Colors.WHITE,
  },
});
