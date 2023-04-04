import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Container from "../../Components/Container/Container";
import NoResults from "../../Components/NoResults/NoResults";
import PageNames from "../../Constants/pageNames";
import { printError } from "../../Utils/utils";
import BookmarkCard from "../../Components/Bookmark/BookmarkCard";

const BookmarksScreen = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (!token) return;

    fetchBookmarks();
  }, [token]);

  const fetchBookmarks = async () => {
    try {
      const { data } = await axios.get("/user/bookmars", {
        headers: { Authorization: token },
      });

      setBookmarks(data.bookmarks);
    } catch (error) {
      printError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = () =>
    bookmarks.length ? (
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <BookmarkCard
            item={item}
            index={index}
            onPress={() =>
              navigation.navigate(PageNames.BOOKMARK_INFORMATION, {
                bookmark: item,
              })
            }
          />
        )}
        style={{ marginTop: 24 }}
      />
    ) : (
      <NoResults
        primaryText="Jūs neturite jokių išsaugotų maršrutų"
        secondaryText="Kelionių paieškoje galite išsaugoti norimą maršrutą"
        buttonText="Į kelionių paiešką"
        onPress={() => navigation.jumpTo(PageNames.SEARCH)}
      />
    );

  return (
    <Container>
      {isLoading ? <Spinner visible={isLoading} /> : renderResults()}
    </Container>
  );
};

export default BookmarksScreen;
