import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Form/Header";
import NoResults from "../../Components/NoResults/NoResults";
import PageNames from "../../Constants/pageNames";
import Sizes from "../../Constants/sizes";
import { printError } from "../../Utils/utils";
import BookmarksStyle from "./BookmarksStyles";

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

  const renderResults = () => <View></View>;

  return (
    <Container>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <NoResults
          primaryText="Jūs neturite jokių išsaugotų maršrutų"
          secondaryText="Kelionių paieškoje galite išsaugoti norimą maršrutą"
          buttonText="Į kelionių paiešką"
          onPress={() => navigation.jumpTo(PageNames.SEARCH)}
        />
      )}
      {/* <Header
        text="Išsaugoti kelionių paieškos"
        size={Sizes.HEADER_MEDIUM}
        containerStyling={BookmarksStyle.header}
      /> */}
    </Container>
  );
};

export default BookmarksScreen;
