import ButtonsSwitch from "../../Components/ButtonsSwitch/ButtonsSwitch";
import PropTypes from "prop-types";
import Container from "../../Components/Container/Container";
import PublishStyles from "./PublishStyles";
import { View } from "react-native";
import Input from "../../Components/Form/Input";
import Header from "../../Components/Form/Header";
import Sizes from "../../Constants/sizes";
import { useState, useEffect } from "react";
import PageNames from "../../Constants/pageNames";
import Button from "../../Components/Button/Button";
import Map from "../../Components/Map/Map";
import { useIsFocused } from "@react-navigation/native";

const PublishScreen = ({ navigation, route, tabNavigation }) => {
  const [departure, setDeparture] = useState({});
  const [isMapVisible, setIsMapVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!route.params || !tabNavigation.isFocused() || !isFocused) return;
    setDeparture(route.params.departure);
  }, [route.params, tabNavigation, isFocused]);

  useEffect(() => {
    if (!departure.addressLine1) return;
    setIsMapVisible(true);
  }, [departure]);

  const handleOnFocus = () => {
    setIsMapVisible(false);
    navigation.navigate(PageNames.CITY_SEARCH, {
      inputType: "departure",
      value: departure?.addressLine1,
    });
  };

  return (
    <Container>
      <ButtonsSwitch
        leftButtonText="Kelionės skelbimas"
        rightButtonText="Kelionės paieška"
      />
      <View style={PublishStyles.formContainer}>
        <Header
          text="Pasirinkite kelionės pradžios tašką 🏁"
          size={Sizes.HEADER_MEDIUM}
        />
        <Input
          placeholder={"Išvykimo vieta"}
          icon={"pin-outline"}
          value={departure?.addressLine1}
          containerStyling={PublishStyles.inputContainer}
          onFocus={handleOnFocus}
        />
      </View>
      {isMapVisible && (
        <>
          <Map
            hintText="Ar tai yra vieta iš kurios išvykstate?"
            latitude={departure.latitude}
            longitude={departure.longitude}
            onDrangEnd={({ latitude, longitude }) =>
              setDeparture((prevState) => ({
                ...prevState,
                latitude,
                longitude,
              }))
            }
          />
          <Button text="Toliau" styling={PublishStyles.buttonContainer} />
        </>
      )}
    </Container>
  );
};

PublishScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default PublishScreen;
