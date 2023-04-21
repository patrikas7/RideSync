import { View, Text, TouchableHighlight } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  TripOptions,
  DepartureTimeSlots,
  AvailableSeatsSlots,
} from "./FiltersConstants";
import { Slider } from "@miblanchard/react-native-slider";
import { isObjectEmpty } from "../../Utils/utils";
import styles from "./FiltersStyle";
import RadioButtons from "../RadioButtons/RadioButtons";
import HorizontalSlider from "../HorizontalSlider/HorizontalSlider";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import Button from "../Button/Button";
import Checkbox from "expo-checkbox";
import useScreenIconRight from "../../hooks/useScreenIconRight";

export const initialState = {
  tripOption: Object.keys(TripOptions)[2],
  departureTime: DepartureTimeSlots[0].key,
  availableSeats: AvailableSeatsSlots[0].key,
  onlyFreeTrips: false,
  isAddToFavouritesSelcted: false,
  priceRange: [5, 50],
};

const Filters = ({ onButtonPress, prefill, navigation }) => {
  const [state, setState] = useState(
    isObjectEmpty(prefill) ? initialState : prefill
  );

  useScreenIconRight({
    navigation,
    icons: ["refresh-outline"],
    shouldRender: true,
    onPress: () => setState(initialState),
  });

  const renderSliderSlot = (item, index, activeSlot, setActiveSlot) => (
    <TouchableHighlight
      style={[
        styles.sliderSlot,
        index > 0 && styles.sliderSlotNotFirst,
        item.key === activeSlot && styles.sliderSlotActive,
      ]}
      onPress={() => setActiveSlot(item.key)}
      underlayColor={Colors.HIGHLIGHT_UNDERLAY}
    >
      <Text
        style={[
          styles.sliderSlotText,
          item.key === activeSlot && styles.sliderSlotTextActive,
        ]}
      >
        {item.value}
      </Text>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filtersWrapper}>
        <View style={styles.filtersSection}>
          <Text style={styles.headline}>Sustojimai</Text>
          <RadioButtons
            labels={Object.values(TripOptions)}
            values={Object.keys(TripOptions)}
            selected={state.tripOption}
            onSelect={(tripOption) =>
              setState((prevState) => ({ ...prevState, tripOption }))
            }
          />
        </View>
        <View style={[styles.filtersSection, styles.filtersSectionNotFirst]}>
          <Text style={styles.headline}>Išvyimo laikas</Text>
          <HorizontalSlider
            data={DepartureTimeSlots}
            renderItem={({ item, index }) =>
              renderSliderSlot(item, index, state.departureTime, (key) =>
                setState((prevState) => ({ ...prevState, departureTime: key }))
              )
            }
          />
        </View>

        <View style={[styles.filtersSection, styles.filtersSectionNotFirst]}>
          <Text style={styles.headline}>Laisvų vietų skaičius</Text>
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
            styles.filtersSection,
            styles.filtersSectionNotFirst,
            state?.isAddToFavouritesSelcted === undefined &&
              styles.filtersSectionLast,
          ]}
        >
          <Text style={styles.headline}>Kelionės kaina žmogui</Text>
          <Slider
            thumbTintColor={Colors.BLUE_500}
            maximumTrackTintColor={Colors.GREY_600}
            minimumTrackTintColor={Colors.BLUE_500}
            minimumValue={0}
            maximumValue={100}
            step={1}
            containerStyle={styles.slider}
            renderTrackMarkComponent={(index) => (
              <Text
                style={styles.trackMarkText}
              >{`${state.priceRange[index]}€`}</Text>
            )}
            trackMarks={[1, 99]}
            value={state.priceRange}
            onValueChange={(priceRange) =>
              setState((prevState) => ({ ...prevState, priceRange }))
            }
          />
          <View style={styles.checkboxContainer}>
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
            <Text style={styles.text}>Tik nemokamos kelionės</Text>
          </View>
        </View>
        {state?.isAddToFavouritesSelcted !== undefined && (
          <View
            style={[
              styles.filtersSection,
              styles.filtersSectionNotFirst,
              styles.filtersSectionLast,
            ]}
          >
            <View style={styles.addToFavorites}>
              <TouchableHighlight
                onPress={() =>
                  setState((prevState) => ({
                    ...prevState,
                    isAddToFavouritesSelcted:
                      !prevState.isAddToFavouritesSelcted,
                  }))
                }
                underlayColor={Colors.WHITE}
              >
                <Ionicons
                  name={
                    state.isAddToFavouritesSelcted ? "star" : "star-outline"
                  }
                  size={Sizes.ICON}
                  color={Colors.GOLD}
                />
              </TouchableHighlight>
              <Text style={styles.text}>Pridėti paiešką prie favoritų</Text>
            </View>
          </View>
        )}
      </View>
      <Button
        text={"Išsaugoti"}
        styling={styles.button}
        onClick={() => onButtonPress(state)}
      />
    </View>
  );
};

export default Filters;
