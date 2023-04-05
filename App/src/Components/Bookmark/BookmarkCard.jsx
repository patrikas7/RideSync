import { View, TouchableHighlight, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TripOptions } from "../Filters/FiltersConstants";
import {
  getTimeFrameText,
  getSeatsCountText,
  getPriceText,
} from "./BookmarkUtils";
import styles from "./BookmarkStyles";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const BookmarkCard = ({ item, index, onPress }) => {
  return (
    <TouchableHighlight
      style={[styles.bookmarkCard, index && styles.bookmarkCardNotFirst]}
      underlayColor={Colors.HIGHLIGHT_UNDERLAY}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View>
        <Text
          style={styles.headline}
        >{`${item.departure} - ${item.destination}`}</Text>
        <View style={styles.cardDetailsWrapper}>
          <View style={styles.propertiesContainer}>
            <View style={styles.property}>
              <Ionicons
                name="options-outline"
                size={Sizes.ICON}
                color={Colors.BLACK}
              />
              <Text style={styles.iconText}>
                {TripOptions[item.tripOption]}
              </Text>
            </View>

            <View style={[styles.property, styles.propertyNotFirst]}>
              <Ionicons
                name="time-outline"
                size={Sizes.ICON}
                color={Colors.BLACK}
              />
              <Text style={styles.iconText}>
                {getTimeFrameText(item.departureTime)}
              </Text>
            </View>

            <View style={[styles.property, styles.propertyNotFirst]}>
              <Ionicons
                name="people-outline"
                size={Sizes.ICON}
                color={Colors.BLACK}
              />
              <Text style={styles.iconText}>
                {getSeatsCountText(item.availableSeats)}
              </Text>
            </View>

            <View style={[styles.property, styles.propertyNotFirst]}>
              <Ionicons
                name="cash-outline"
                size={Sizes.ICON}
                color={Colors.BLACK}
              />
              <Text style={styles.iconText}>
                {getPriceText(item.onlyFreeTrips, item.priceRange)}
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={Sizes.ICON}
            color={Colors.GREY_600}
            style={styles.arrowIcon}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default BookmarkCard;
