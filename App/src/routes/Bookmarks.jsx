import { createStackNavigator } from "@react-navigation/stack";
import PageNames from "../Constants/pageNames";
import BookmarkInformationScreen from "../Views/Bookmarks/BookmarkInformationScreen";
import BookmarksScreen from "../Views/Bookmarks/BookmarksScreen";
import useUserData from "../hooks/useUserData";

const Bookmarks = () => {
  const Stack = createStackNavigator();
  const { token } = useUserData();

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
    </Stack.Navigator>
  );
};

export default Bookmarks;
