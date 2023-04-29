import { useState } from "react";
import { getFormatedTodaysDate } from "../../Utils/utils";
import Container from "../../Components/Container/Container";
import DateAndTimePicker from "../../Components/TimeAndDatePicker/TimeAndDatePicker";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import Button from "../../Components/Button/Button";
import { useNavigation, useRoute } from "@react-navigation/native";

const BookmarkDateAndTimeSelectScreen = ({ mainNavigation, token, id }) => {
  const [tripDate, setTripDate] = useState(getFormatedTodaysDate());
  const navigation = useNavigation();
  const route = useRoute();
  const { bookmark } = route.params;
  useScreenArrowBack(navigation, PageNames.BOOKMARK_INFORMATION, { bookmark });

  const handleOnNextPress = () => {
    mainNavigation.navigate(PageNames.TRIPS, {
      destination: { city: bookmark.destination },
      departure: { city: bookmark.departure },
      date: tripDate,
      token,
      id,
      query: {
        tripOption: bookmark.tripOption,
        departureTime: bookmark.departureTime,
        availableSeats: bookmark.availableSeats,
        onlyFreeTrips: bookmark.onlyFreeTrips,
        isAddToFavouritesSelcted: bookmark.isAddToFavouritesSelcted,
        priceRange: bookmark.priceRange,
        isAddToFavouritesSelcted: false,
      },
    });
  };

  return (
    <Container>
      <DateAndTimePicker
        date={tripDate}
        handleOnDateChange={({ date }) => {
          if (date !== tripDate) setTripDate(date);
        }}
        mode={"calendar"}
      />

      <Button
        text={"Ieškoti"}
        styling={{ marginBottom: 32 }}
        onClick={handleOnNextPress}
      />
    </Container>
  );
};

export default BookmarkDateAndTimeSelectScreen;
