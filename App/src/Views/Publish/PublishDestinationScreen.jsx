import PropTypes from "prop-types";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import MapLocationSearch from "../../Components/MapLocationSearch/MapLocationSearch";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessages from "../../Constants/errorMessages";
import {
  PublishTypes,
  setDestination,
  setDestinationError,
} from "../../redux/publish/publishSlice";
import { useEffect } from "react";

const PublishDestinationScreen = ({ navigation, route }) => {
  const currentNavigation = useNavigation();
  const currentRoute = useRoute();
  const { departure, destination, publishType } = useSelector(
    (state) => state.publish
  );
  const destinationError = useSelector(
    (state) => state.publishErrors.destination
  );
  const dispatch = useDispatch();
  useScreenArrowBack(currentNavigation, PageNames.PUBLISH_DEPARTURE_SEARCH);

  useEffect(() => {
    dispatch(
      setDestinationError(
        destination.city === departure.city ? ErrorMessages.SAME_CITIES : ""
      )
    );
  }, [destination]);

  return (
    <Container>
      <MapLocationSearch
        headerText="Pasirinkite kelionės pabaigos tašką 🏁"
        inputPlaceholder="Atvykimo vieta"
        mapHintText="Ar tai yra vieta į kurią atvykstate?"
        navigation={navigation}
        currentScreen={currentRoute.name}
        nextScreen={
          publishType === PublishTypes.PUBLISH_TRIP
            ? PageNames.PUBLISH_STOPS
            : PageNames.PUBLISH_DATE_AND_TIME
        }
        route={route}
        location={destination}
        onLocationChange={(destination) =>
          dispatch(setDestination(destination))
        }
        error={destinationError}
      />
    </Container>
  );
};

PublishDestinationScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default PublishDestinationScreen;
