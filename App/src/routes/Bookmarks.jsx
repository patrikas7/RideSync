import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import BookmarkInformationScreen from "../Views/Bookmarks/BookmarkInformationScreen";
import BookmarksScreen from "../Views/Bookmarks/BookmarksScreen";
import useUserData from "../hooks/useUserData";
import BookmarkEditScreen from "../Views/Bookmarks/BookmarkEditScreen";
import CitySearchScreen from "../Views/Search/CitySearchScreen";

const Bookmarks = ({ token }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PageNames.BOOKMARKS_LIST}
        children={() => <BookmarksScreen token={token} />}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={PageNames.BOOKMARK_INFORMATION}
        children={() => <BookmarkInformationScreen token={token} />}
        options={{
          title: "Išsaugotas maršrutas",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name={PageNames.BOOKMARK_EDIT}
        children={() => <BookmarkEditScreen token={token} />}
        options={{
          title: "Maršruto redagavimas",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name={PageNames.CITY_SEARCH}
        component={CitySearchScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default Bookmarks;
