import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { showMessage } from "react-native-flash-message";
import Container from "../../Components/Container/Container";
import Filters from "../../Components/Filters/Filters";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import InputSearch from "../../Components/Form/InputSearch";
import ErrorMessages from "../../Constants/errorMessages";
import { printError } from "../../Utils/utils";
import axios from "axios";

const BookmarkEditScreen = ({ token }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [bookmark, setBookmark] = useState(route.params?.bookmark);
  const [isLoading, setIsLoading] = useState(false);
  useScreenArrowBack(navigation, PageNames.BOOKMARK_INFORMATION, { bookmark });

  useEffect(() => {
    if (!route.params?.destination) return;

    setBookmark((prevState) => ({
      ...prevState,
      destination: route.params.destination.city,
    }));
  }, [route.params?.destination]);

  useEffect(() => {
    if (!route.params?.departure) return;

    setBookmark((prevState) => ({
      ...prevState,
      departure: route.params.departure.city,
    }));
  }, [route.params?.departure]);

  const handleOnSave = async (filters) => {
    if (bookmark.departure === bookmark.destination) {
      displayMessage(ErrorMessages.SAME_CITIES, "danger");
      return;
    }

    setIsLoading(true);

    try {
      await axios.put(
        "/bookmarks",
        {
          availableSeats: filters.availableSeats,
          departure: bookmark.departure,
          destination: bookmark.destination,
          departureTime: filters.departureTime,
          onlyFreeTrips: filters.onlyFreeTrips,
          priceRange: filters.priceRange,
          tripOption: filters.tripOption,
        },
        {
          params: { id: bookmark._id },
          headers: { Authorization: token },
        }
      );

      displayMessage("Maršrutas buvo sėkmingai išsaugotas", "success");
      navigation.navigate(PageNames.BOOKMARKS_LIST);
    } catch (error) {
      printError(error);
    }

    setIsLoading(false);
  };

  const displayMessage = (message, type) => {
    showMessage({
      message,
      type,
    });
  };

  const handleOnInputFocus = (inputType) => {
    navigation.navigate(PageNames.CITY_SEARCH, {
      inputType,
      value: bookmark[inputType],
      prevScreen: PageNames.BOOKMARK_EDIT,
      navigateToPrev: true,
    });

    Keyboard.dismiss();
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputSearch
          placeholder={"Išvykimo vieta"}
          value={bookmark.departure}
          styling={{ marginTop: 16 }}
          onFocus={() => handleOnInputFocus("departure")}
        />

        <InputSearch
          placeholder={"Atvykimo vieta"}
          value={bookmark.destination}
          styling={{ marginVertical: 24 }}
          onFocus={() => handleOnInputFocus("destination")}
        />

        <Filters onButtonPress={handleOnSave} prefill={bookmark} />
      </ScrollView>
    </Container>
  );
};

export default BookmarkEditScreen;
