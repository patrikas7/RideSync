import { View } from "react-native";
import Container from "../../Components/Container/Container";
import { useNavigation, useRoute } from "@react-navigation/native";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import PageNames from "../../Constants/pageNames";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import StopsList from "../../Components/StopsList/StopsList";
import Button from "../../Components/Button/Button";
import TextButton from "../../Components/Button/TextButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PublishStopsScreen = ({ mainNavigation, mainRoute }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { departure, destination, stops } = useSelector(
    (state) => state.publish
  );
  useScreenArrowBack(navigation, PageNames.PUBLISH_DESTINATION_SEARCH);

  useEffect(() => {
    if (!route.params || route.params.screen !== currentRoute.name) return;
  }, [route.params]);

  const handleOnPress = () => {
    mainNavigation.navigate(PageNames.CITY_SEARCH, {
      inputType: "departure",
      prevScreen: route.name,
    });
  };

  return (
    <Container>
      <Header text="Pridėkite kelionės sustojimus" size={Sizes.HEADER_MEDIUM} />
      <StopsList
        containerStyling={{ marginTop: 24 }}
        firstStop={departure}
        lastStop={destination}
        stops={stops}
      />
      <TextButton styling={{ marginTop: 18 }} onPress={handleOnPress} />
    </Container>
  );
};

export default PublishStopsScreen;
