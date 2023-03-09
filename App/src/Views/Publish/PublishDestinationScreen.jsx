import PropTypes from "prop-types";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import MapLocationSearch from "../../Components/MapLocationSearch/MapLocationSearch";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import { useNavigation, useRoute } from "@react-navigation/native";

const PublishDestinationScreen = ({ navigation, route }) => {
  const currentNavigation = useNavigation();
  const currentRoute = useRoute();
  useScreenArrowBack(currentNavigation, PageNames.PUBLISH_DEPARTURE_SEARCH);

  return (
    <Container>
      <MapLocationSearch
        headerText="Pasirinkite kelionės pabaigos tašką 🏁"
        inputPlaceholder="Atvykimo vieta"
        mapHintText="Ar tai yra vieta į kurią atvykstate?"
        navigation={navigation}
        currentScreen={currentRoute.name}
        nextScreen={PageNames.PUBLISH_DESTINATION_SEARCH}
        route={route}
      />
    </Container>
  );
};

PublishDestinationScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default PublishDestinationScreen;
