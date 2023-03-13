import Container from "../../Components/Container/Container";
import { useNavigation, useRoute } from "@react-navigation/native";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import MapLocationSearch from "../../Components/MapLocationSearch/MapLocationSearch";
import { useDispatch } from "react-redux";
import { removeStop, updateStop } from "../../redux/publish/publishSlice";

const PublishStopEditScreen = ({ mainNavigation, mainRoute }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  useScreenArrowBack(navigation, PageNames.PUBLISH_STOPS);

  const onLocationChange = (stop) => {
    dispatch(updateStop({ stop, index: route.params.index }));
  };

  const onLocationRemove = () => {
    dispatch(removeStop(route.params.index));
  };

  return (
    <Container>
      <MapLocationSearch
        headerText="Pasirinkite kelionės sustojimo tašką 🏁"
        inputPlaceholder="Sustojimo vieta"
        mapHintText="Ar tai yra vieta kurioje sustojate?"
        navigation={mainNavigation}
        currentScreen={route.name}
        nextScreen={PageNames.PUBLISH_STOPS}
        route={mainRoute}
        location={route.params.stop}
        onLocationChange={onLocationChange}
        onLocationRemove={onLocationRemove}
      />
    </Container>
  );
};

export default PublishStopEditScreen;
