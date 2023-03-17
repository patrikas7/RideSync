import { useNavigation } from "@react-navigation/native";
import Container from "../../Components/Container/Container";
import Success from "../../Components/Success/Success";
import PageNames from "../../Constants/pageNames";

const PublishSuccessPage = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Success
        primaryText="Kelionė buvo sukurta"
        secondaryText=" Kelionės informacija galite peržiūrėti būsimų kelionių skiltyje"
        buttonText="Kurti naują kelionę"
        onPress={() => navigation.navigate(PageNames.PUBLISH_DEPARTURE_SEARCH)}
      />
    </Container>
  );
};

export default PublishSuccessPage;
