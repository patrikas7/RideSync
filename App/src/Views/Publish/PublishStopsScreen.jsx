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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStop } from "../../redux/publish/publishSlice";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import ErrorMessages from "../../Constants/errorMessages";

// Prideti sustojimo taisymo istrinimo logika

const PublishStopsScreen = ({ mainNavigation, mainRoute }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const flashMessageRef = useRef();
  const { departure, destination, stops } = useSelector(
    (state) => state.publish
  );
  useScreenArrowBack(navigation, PageNames.PUBLISH_DESTINATION_SEARCH);

  useEffect(() => {
    if (!mainRoute.params || mainRoute.params.screen !== route.name) return;
    onStopSelect(mainRoute.params.departure);
  }, [mainRoute.params]);

  const handleOnPress = () => {
    mainNavigation.navigate(PageNames.CITY_SEARCH, {
      inputType: "departure",
      prevScreen: route.name,
    });
  };

  const onStopSelect = (location) => {
    const city = location.city;
    if (
      city === departure.city ||
      city === destination.city ||
      stops.some((el) => el.city === city)
    ) {
      showMessage({
        message: ErrorMessages.SAME_STOP_CITY,
        type: "danger",
      });
      return;
    }

    dispatch(addStop(location));
  };

  return (
    <Container>
      <Header text="Pridėkite kelionės sustojimus" size={Sizes.HEADER_MEDIUM} />
      <View style={{ flex: 1 }}>
        <StopsList
          containerStyling={{ marginTop: 24 }}
          firstStop={departure}
          lastStop={destination}
          stops={stops}
        />
        <TextButton styling={{ marginTop: 18 }} onPress={handleOnPress} />
      </View>

      <Button text="Toliau" styling={{ marginBottom: 32 }} />
      <FlashMessage ref={flashMessageRef} position={"bottom"} floating={true} />
    </Container>
  );
};

export default PublishStopsScreen;
