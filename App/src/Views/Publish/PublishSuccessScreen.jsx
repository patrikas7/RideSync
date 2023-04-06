import Container from "../../Components/Container/Container";
import Success from "../../Components/Success/Success";
import PageNames from "../../Constants/pageNames";

const PublishSuccessPage = ({ navigation, route }) => {
  const { isTripPublish } = route.params;

  const primaryText = isTripPublish
    ? "Kelionė buvo sukurta"
    : "Kelionės paieškos užklausa buvo sėkmingai sukurta";

  return (
    <Container>
      <Success
        primaryText={primaryText}
        secondaryText="Kelionės informacija galite peržiūrėti mano kelionių skiltyje"
        buttonText="Kurti naują kelionę"
        onPress={() => navigation.navigate(PageNames.PUBLISH_DEPARTURE_SEARCH)}
      />
    </Container>
  );
};

export default PublishSuccessPage;
