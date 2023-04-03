import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableHighlight, Text } from "react-native";
import { TripFiltersStyles } from "./TripsSearchResultsStyle";
import {
  TripOptionsValues,
  TripOptionsLabels,
  DepartureTimeSlots,
  AvailableSeatsSlots,
} from "./TripSearchFiltersConstants";
import { Slider } from "@miblanchard/react-native-slider";
import Button from "../../../Components/Button/Button";
import Container from "../../../Components/Container/Container";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import Sizes from "../../../Constants/sizes";
import Colors from "../../../Constants/colors";
import RadioButtons from "../../../Components/RadioButtons/RadioButtons";
import HorizontalSlider from "../../../Components/HorizontalSlider/HorizontalSlider";
import Checkbox from "expo-checkbox";

const TripSearchFiltersScreen = ({ navigation }) => {
  const [state, setState] = useState({
    tripOption: TripOptionsValues.ALL_TRIPS,
    departureTime: DepartureTimeSlots[0].key,
    availableSeats: AvailableSeatsSlots[0].key,
    onlyFreeTrips: false,
    isAddToFavouritesSelcted: false,
    priceRange: [5, 50],
  });
  useScreenArrowBack(navigation, PageNames.TRIP_SEARCH_RESULTS);

  const filter = async () => {};

  const renderSliderSlot = (item, index, activeSlot, setActiveSlot) => (
    <TouchableHighlight
      style={[
        TripFiltersStyles.sliderSlot,
        index > 0 && TripFiltersStyles.sliderSlotNotFirst,
        item.key === activeSlot && TripFiltersStyles.sliderSlotActive,
      ]}
      onPress={() => setActiveSlot(item.key)}
      underlayColor={Colors.HIGHLIGHT_UNDERLAY}
    >
      <Text
        style={[
          TripFiltersStyles.sliderSlotText,
          item.key === activeSlot && TripFiltersStyles.sliderSlotTextActive,
        ]}
      >
        {item.value}
      </Text>
    </TouchableHighlight>
  );

  return (
    <Container>
      <View style={TripFiltersStyles.filtersWrapper}>
        <View style={TripFiltersStyles.filtersSection}>
          <Text style={TripFiltersStyles.headline}>Sustojimai</Text>
          <RadioButtons
            labels={TripOptionsLabels}
            values={Object.values(TripOptionsValues)}
            selected={state.tripOption}
            onSelect={(tripOption) =>
              setState((prevState) => ({ ...prevState, tripOption }))
            }
          />
        </View>
        <View
          style={[
            TripFiltersStyles.filtersSection,
            TripFiltersStyles.filtersSectionNotFirst,
          ]}
        >
          <Text style={TripFiltersStyles.headline}>Išvyimo laikas</Text>
          <HorizontalSlider
            data={DepartureTimeSlots}
            renderItem={({ item, index }) =>
              renderSliderSlot(item, index, state.departureTime, (key) =>
                setState((prevState) => ({ ...prevState, departureTime: key }))
              )
            }
          />
        </View>

        <View
          style={[
            TripFiltersStyles.filtersSection,
            TripFiltersStyles.filtersSectionNotFirst,
          ]}
        >
          <Text style={TripFiltersStyles.headline}>Laisvų vietų skaičius</Text>
          <HorizontalSlider
            data={AvailableSeatsSlots}
            renderItem={({ item, index }) =>
              renderSliderSlot(item, index, state.availableSeats, (key) =>
                setState((prevState) => ({ ...prevState, availableSeats: key }))
              )
            }
          />
        </View>

        <View
          style={[
            TripFiltersStyles.filtersSection,
            TripFiltersStyles.filtersSectionNotFirst,
          ]}
        >
          <Text style={TripFiltersStyles.headline}>Kelionės kaina žmogui</Text>
          <Slider
            thumbTintColor={Colors.BLUE_500}
            maximumTrackTintColor={Colors.GREY_600}
            minimumTrackTintColor={Colors.BLUE_500}
            minimumValue={0}
            maximumValue={100}
            step={1}
            containerStyle={TripFiltersStyles.slider}
            renderTrackMarkComponent={(index) => (
              <Text
                style={TripFiltersStyles.trackMarkText}
              >{`${state.priceRange[index]}€`}</Text>
            )}
            trackMarks={[1, 99]}
            value={state.priceRange}
            onValueChange={(priceRange) =>
              setState((prevState) => ({ ...prevState, priceRange }))
            }
          />
          <View style={TripFiltersStyles.checkboxContainer}>
            <Checkbox
              value={state.onlyFreeTrips}
              onValueChange={() =>
                setState((prevState) => ({
                  ...prevState,
                  onlyFreeTrips: !prevState.onlyFreeTrips,
                }))
              }
              color={state.onlyFreeTrips ? Colors.BLUE_500 : undefined}
            />
            <Text style={TripFiltersStyles.text}>Tik nemokamos kelionės</Text>
          </View>
        </View>
        <View
          style={[
            TripFiltersStyles.filtersSection,
            TripFiltersStyles.filtersSectionNotFirst,
            TripFiltersStyles.filtersSectionLast,
          ]}
        >
          <View style={TripFiltersStyles.addToFavorites}>
            <TouchableHighlight
              onPress={() =>
                setState((prevState) => ({
                  ...prevState,
                  isAddToFavouritesSelcted: !prevState.isAddToFavouritesSelcted,
                }))
              }
              underlayColor={Colors.WHITE}
            >
              <Ionicons
                name={state.isAddToFavouritesSelcted ? "star" : "star-outline"}
                size={Sizes.ICON}
                color={Colors.GOLD}
              />
            </TouchableHighlight>
            <Text style={TripFiltersStyles.text}>
              Pridėti paiešką prie favoritų
            </Text>
          </View>
        </View>
      </View>
      <Button text={"Išsaugoti"} styling={TripFiltersStyles.button} />
    </Container>
  );
};

export default TripSearchFiltersScreen;
