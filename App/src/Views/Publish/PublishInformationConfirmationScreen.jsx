import { useNavigation } from "@react-navigation/native";
import Container from "../../Components/Container/Container";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import PublishInformation from "../../Components/Publish/PublishInformation";

const PublishInformationConfirmationScreen = () => {
  const navigation = useNavigation();
  useScreenArrowBack(navigation, PageNames.PUBLISH_ROUTE_CONFIRMATION);

  return (
    <Container>
      <Header
        text="Patvirtinkite kelionės dėtales"
        size={Sizes.HEADER_MEDIUM}
      />
      <PublishInformation />
    </Container>
  );
};

export default PublishInformationConfirmationScreen;
