import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import Container from "../../Components/Container/Container";
import Map from "../../Components/Map/Map";
import Button from "../../Components/Button/Button";
import PublishStyles from "./PublishStyles";
import { generatePins } from "./PublishUtils";

const PublishRouteConfirmationScreen = () => {
  const navigation = useNavigation();
  const { departure, destination, stops } = useSelector(
    (state) => state.publish
  );
  useScreenArrowBack(navigation, PageNames.PUBLISH_INFORMATION);

  return (
    <Container>
      <Header
        text="Patvirtinkite kelionės sustojimus"
        size={Sizes.HEADER_MEDIUM}
      />
      <Map pins={generatePins(departure, destination, stops)} />
      <Button
        text={"Toliau"}
        styling={PublishStyles.button}
        onClick={() =>
          navigation.navigate(PageNames.PUBLISH_INFORMATION_CONFIRMATION)
        }
      />
    </Container>
  );
};

export default PublishRouteConfirmationScreen;
