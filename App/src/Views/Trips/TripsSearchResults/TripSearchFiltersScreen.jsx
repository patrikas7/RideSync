import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableHighlight, Text } from "react-native";
import { TripFiltersStyles } from "./TripsSearchResultsStyle";
import Button from "../../../Components/Button/Button";
import Container from "../../../Components/Container/Container";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import Sizes from "../../../Constants/sizes";
import Colors from "../../../Constants/colors";
import RadioButtons from "../../../Components/RadioButtons/RadioButtons";
import HorizontalSlider from "../../../Components/HorizontalSlider/HorizontalSlider";

const TripOptionsValues = {
  TRIP_WITH_STOPS: "TRIP_WITH_STOPS",
  TRIP_WITHOUT_STOPS: "TRIP_WITHOUT_STOPS",
  ALL_TRIPS: "ALL_TRIPS",
};

const TripOptionsLabels = [
  "Kelionės su sustojimas",
  "Kelionės be sustojimų",
  "Visos kelionės",
];

const departureTimeSlots = [
  "00:00-06:00",
  "06:00-12:00",
  "12:00-18:00",
  "18:00-23:59",
];

const TripSearchFiltersScreen = ({ navigation }) => {
  const [state, setState] = useState({
    tripOption: TripOptionsValues.ALL_TRIPS,
  });
  useScreenArrowBack(navigation, PageNames.TRIP_SEARCH_RESULTS);

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
            renderItem={({ item, index }) => (
              <View
                style={[
                  TripFiltersStyles.timeSlot,
                  index > 0 && TripFiltersStyles.timeSlotNotFirst,
                  index === 1 && TripFiltersStyles.timeSlotActive,
                ]}
              >
                <Text
                  style={[
                    TripFiltersStyles.timeSlotText,
                    index === 1 && TripFiltersStyles.timeSlotTextActive,
                  ]}
                >
                  {item}
                </Text>
              </View>
            )}
          />
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
