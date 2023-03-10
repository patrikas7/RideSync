import { View } from "react-native";
import Header from "../Form/Header";
import Input from "../Form/Input";
import Sizes from "../../Constants/sizes";
import Map from "../Map/Map";
import Button from "../Button/Button";
import MapLocationSearchStyles from "./MapLocationSearchStyles";
import { useState, useEffect } from "react";
import PageNames from "../../Constants/pageNames";
import { useRoute, useNavigation } from "@react-navigation/native";

const MapLocationSearch = ({
  headerText,
  inputPlaceholder,
  mapHintText,
  navigation,
  currentScreen,
  nextScreen,
  route,
  containerStyling,
  location,
  onLocationChange,
  error,
}) => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const currentRoute = useRoute();
  const currentNavigation = useNavigation();

  useEffect(() => {
    if (!route.params || route.params.screen !== currentRoute.name) return;
    onLocationChange(route.params.departure);
  }, [route.params]);

  useEffect(() => {
    if (!location.addressLine1) return;
    setIsMapVisible(true);
  }, [location]);

  const handleOnFocus = () => {
    setIsMapVisible(false);
    navigation.navigate(PageNames.CITY_SEARCH, {
      inputType: "departure",
      value: location?.addressLine1,
      prevScreen: currentScreen,
    });
  };

  const handleOnNextClick = () => {
    currentNavigation.navigate(nextScreen);
  };

  return (
    <>
      <View style={containerStyling}>
        <Header text={headerText} size={Sizes.HEADER_MEDIUM} />
        <Input
          placeholder={inputPlaceholder}
          icon={"pin-outline"}
          value={location?.addressLine1}
          containerStyling={MapLocationSearchStyles.inputContainer}
          onFocus={handleOnFocus}
        />
      </View>
      {isMapVisible && (
        <>
          <Map
            hintText={mapHintText}
            error={error}
            latitude={location.latitude}
            longitude={location.longitude}
            onDrangEnd={({ latitude, longitude }) =>
              onLocationChange({
                ...location,
                latitude,
                longitude,
              })
            }
          />
          {!error && (
            <Button
              text="Toliau"
              styling={MapLocationSearchStyles.buttonContainer}
              onClick={() => handleOnNextClick()}
            />
          )}
        </>
      )}
    </>
  );
};

export default MapLocationSearch;
