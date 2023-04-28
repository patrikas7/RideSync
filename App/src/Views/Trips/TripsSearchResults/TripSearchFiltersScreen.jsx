import Container from "../../../Components/Container/Container";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import Filters from "../../../Components/Filters/Filters";

const TripSearchFiltersScreen = ({ navigation, route }) => {
  const { filters } = route.params;

  useScreenArrowBack(
    navigation,
    PageNames.TRIP_SEARCH_RESULTS,
    {},
    "close-outline"
  );

  const handleOnSave = (state) => {
    navigation.navigate(PageNames.TRIP_SEARCH_RESULTS, { query: state });
  };

  return (
    <Container>
      <Filters
        onButtonPress={handleOnSave}
        prefill={filters}
        navigation={navigation}
      />
    </Container>
  );
};

export default TripSearchFiltersScreen;
