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

const PublishRouteConfirmationScreen = () => {
  const navigation = useNavigation();
  const state = useSelector((state) => state.publish);
  console.log(state);
  const pins = [
    {
      latitude: state.departure.latitude,
      longitude: state.departure.longitude,
      draggable: false,
    },
    {
      latitude: state.destination.latitude,
      longitude: state.destination.longitude,
      draggable: false,
    },
    ...state.stops.map((stop) => ({
      latitude: stop.latitude,
      longitude: stop.longitude,
      draggable: false,
    })),
  ];
  useScreenArrowBack(navigation, PageNames.PUBLISH_INFORMATION);

  return (
    <Container>
      <Header
        text="Patvirtinkite kelionės maršrutą"
        size={Sizes.HEADER_MEDIUM}
      />
      <Map pins={pins} />
      <Button text={"Toliau"} styling={PublishStyles.button} />
    </Container>
  );
};

export default PublishRouteConfirmationScreen;
