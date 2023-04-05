import { useNavigation, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";

const BookmarkEditScreen = ({ token }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookmark } = route.params;
  useScreenArrowBack(navigation, PageNames.BOOKMARK_INFORMATION);

  return <View></View>;
};

export default BookmarkEditScreen;
