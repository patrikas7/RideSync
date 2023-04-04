import { useNavigation, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { TripOptions } from "../Trips/TripsSearchResults/TripSearchFiltersConstants";
import {
  getTimeFrameText,
  getSeatsCountText,
  getPriceText,
} from "../../Components/Bookmark/BookmarkUtils";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import useScreenIconRight from "../../hooks/useScreenIconRight";
import styles from "../../Components/Bookmark/BookmarkStyles";
import ListItem from "../../Components/List/ListItem";
import Button from "../../Components/Button/Button";

const BookmarkInformationScreen = ({ token }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookmark } = route.params;

  useScreenArrowBack(navigation, PageNames.BOOKMARKS_LIST);
  useScreenIconRight({
    navigation,
    icons: ["trash-outline", "create-outline"],
    shouldRender: true,
  });

  return (
    <Container>
      <View style={styles.informationContainer}>
        <ListItem
          icon={"home-outline"}
          text={"Išvykimas"}
          secondaryText={bookmark.departure}
        />
        <ListItem
          icon={"home-outline"}
          text={"Atvykimas"}
          secondaryText={bookmark.destination}
          itemStyling={styles.bookmarkDetail}
        />
        <ListItem
          icon={"options-outline"}
          text={"Kelionės tipas"}
          secondaryText={TripOptions[bookmark.tripOption]}
          itemStyling={styles.bookmarkDetail}
        />
        <ListItem
          icon={"time-outline"}
          text={"Išvykimo laikas"}
          secondaryText={getTimeFrameText(bookmark.departureTime)}
          itemStyling={styles.bookmarkDetail}
        />
        <ListItem
          icon={"people-outline"}
          text={"Vietų skaičius"}
          secondaryText={getSeatsCountText(bookmark.availableSeats)}
          itemStyling={styles.bookmarkDetail}
        />
        <ListItem
          icon={"cash-outline"}
          text={"Kelionės kaina asmeniui"}
          secondaryText={getPriceText(
            bookmark.onlyFreeTrips,
            bookmark.priceRange
          )}
          itemStyling={styles.bookmarkDetail}
        />
      </View>
      <Button text={"Ieškoti"} styling={styles.button} />
    </Container>
  );
};

export default BookmarkInformationScreen;
