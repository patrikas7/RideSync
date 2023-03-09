import PropTypes from "prop-types";
import { View } from "react-native";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Form/Header";
import NoResults from "../../Components/NoResults/NoResults";
import PageNames from "../../Constants/pageNames";
import Sizes from "../../Constants/sizes";
import BookmarksStyle from "./BookmarksStyles";

const BookmarksScreen = ({ navigation }) => {
  return (
    <Container>
      <NoResults
        containerStyling={BookmarksStyle.noResultsContainer}
        primaryText="Jūs neturite jokių išsaugotų maršrutų"
        secondaryText="Kelionių paieškoje galite išsaugoti norimą maršrutą"
        buttonText="Į kelionių paiešką"
        onPress={() => navigation.jumpTo(PageNames.SEARCH)}
      />
      {/* <Header
        text="Išsaugoti kelionių maršrutai"
        size={Sizes.HEADER_MEDIUM}
        containerStyling={BookmarksStyle.header}
      /> */}
    </Container>
  );
};

BookmarksScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default BookmarksScreen;
