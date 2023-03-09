import ButtonsSwitch from "../../Components/ButtonsSwitch/ButtonsSwitch";
import PropTypes from "prop-types";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import MapLocationSearch from "../../Components/MapLocationSearch/MapLocationSearch";
import PublishStyles from "./PublishStyles";
import { useRoute } from "@react-navigation/native";

const PublishDepartureScreen = ({ navigation, route }) => {
  const currentRoute = useRoute();

  return (
    <Container>
      <ButtonsSwitch
        leftButtonText="Kelionės skelbimas"
        rightButtonText="Kelionės paieška"
      />
      <MapLocationSearch
        headerText="Pasirinkite kelionės pradžios tašką 🏁"
        inputPlaceholder="Išvykimo vieta"
        mapHintText="Ar tai yra vieta iš kurios išvykstate?"
        navigation={navigation}
        currentScreen={currentRoute.name}
        nextScreen={PageNames.PUBLISH_DESTINATION_SEARCH}
        route={route}
        containerStyling={PublishStyles.formContainer}
      />
    </Container>
  );
};

PublishDepartureScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default PublishDepartureScreen;
