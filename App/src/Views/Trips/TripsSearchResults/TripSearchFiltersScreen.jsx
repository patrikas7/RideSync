import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableHighlight, Text } from "react-native";
import { TripFiltersStyles } from "./TripsSearchResultsStyle";
import {
  TripOptionsValues,
  TripOptionsLabels,
  departureTimeSlots,
  availableSeatsSlots,
} from "./TripSearchFiltersConstants";
import Button from "../../../Components/Button/Button";
import Container from "../../../Components/Container/Container";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import Sizes from "../../../Constants/sizes";
import Colors from "../../../Constants/colors";
import RadioButtons from "../../../Components/RadioButtons/RadioButtons";
import HorizontalSlider from "../../../Components/HorizontalSlider/HorizontalSlider";
import RangeSlider from "react-native-range-slider-expo";

const TripSearchFiltersScreen = ({ navigation }) => {
  const [state, setState] = useState({
    tripOption: TripOptionsValues.ALL_TRIPS,
  });
  useScreenArrowBack(navigation, PageNames.TRIP_SEARCH_RESULTS);

  const renderSliderSlot = ({ item, index }) => (
    <View
      style={[
        TripFiltersStyles.sliderSlot,
        index > 0 && TripFiltersStyles.sliderSlotNotFirst,
        index === 1 && TripFiltersStyles.sliderSlotActive,
      ]}
    >
      <Text
        style={[
          TripFiltersStyles.sliderSlotText,
          index === 1 && TripFiltersStyles.sliderSlotTextActive,
        ]}
      >
        {item}
      </Text>
    </View>
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
            data={departureTimeSlots}
            renderItem={renderSliderSlot}
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
            data={availableSeatsSlots}
            renderItem={renderSliderSlot}
          />
        </View>

        <View
          style={[
            TripFiltersStyles.filtersSection,
            TripFiltersStyles.filtersSectionNotFirst,
          ]}
        >
          <Text style={TripFiltersStyles.headline}>Kelionės kaina žmogui</Text>
          {/* <RangeSlider
            min={0}
            max={100}
            step={1}
            initialLowValue={20}
            initialHighValue={80}
            thumbBorderColor={Colors.BLUE_500}
            trackBorderColor={Colors.GREY_600}
            styleSize={"small"}
            onValueChanged={(low, high) =>
              console.log(`Low: ${low}, High: ${high}`)
            }
          /> */}
        </View>

        {/* <View style={TripFiltersStyles.addToFavorites}>
          <TouchableHighlight>
            <Ionicons
              name="star-outline"
              size={Sizes.ICON}
              color={Colors.GOLD}
            />
          </TouchableHighlight>
          <Text style={TripFiltersStyles.addToFavoritesText}>
            Pridėti paiešką prie favoritų
          </Text>
        </View> */}
      </View>
      <Button text={"Ieškoti"} styling={TripFiltersStyles.button} />
    </Container>
  );
};

export default TripSearchFiltersScreen;
