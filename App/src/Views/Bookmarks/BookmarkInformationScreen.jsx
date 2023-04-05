import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View, Alert } from "react-native";
import { TripOptions } from "../Trips/TripsSearchResults/TripSearchFiltersConstants";
import {
  getTimeFrameText,
  getSeatsCountText,
  getPriceText,
} from "../../Components/Bookmark/BookmarkUtils";
import { printError } from "../../Utils/utils";
import { showMessage } from "react-native-flash-message";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import useScreenIconRight from "../../hooks/useScreenIconRight";
import styles from "../../Components/Bookmark/BookmarkStyles";
import ListItem from "../../Components/List/ListItem";
import Button from "../../Components/Button/Button";
import Spinner from "react-native-loading-spinner-overlay/lib";
import axios from "axios";

const BookmarkInformationScreen = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { bookmark } = route.params;

  useScreenArrowBack(navigation, PageNames.BOOKMARKS_LIST);
  const handleOnIconRightPress = (index) =>
    index === 0 ? handleOnDelete() : {};

  useScreenIconRight({
    navigation,
    icons: ["trash-outline", "create-outline"],
    shouldRender: true,
    onPress: handleOnIconRightPress,
  });

  const handleOnDelete = () => {
    Alert.alert(
      "Maršruto šalinimas iš favoritų",
      "Ar tikrai norite pašalinti maršrutą iš favoritų?",
      [
        {
          text: "Ne",
        },
        {
          text: "Taip",
          onPress: () => deleteBookmark(),
        },
      ]
    );
  };

  const deleteBookmark = async () => {
    setIsLoading(true);

    try {
      await axios.delete("/bookmarks", {
        params: { id: bookmark._id },
        headers: { Authorization: token },
      });

      showMessage({
        message: "Maršrutas buvo sėkmingai pašalintas iš favoritų",
        type: "success",
      });

      navigation.navigate(PageNames.BOOKMARKS_LIST);
    } catch (error) {
      printError(error);
    }

    setIsLoading(false);
  };

  const handleOnEdit = () => {};

  return (
    <Container>
      <Spinner visible={isLoading} />
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
