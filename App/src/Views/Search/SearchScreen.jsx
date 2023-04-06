import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import Header from "../../Components/Form/Header";
import SearchHistory from "../../Components/TripSearch/SearchHistory";
import TripSearchForm from "../../Components/TripSearch/TripSearchForm";
import Sizes from "../../Constants/sizes";
import SearchStyles from "./SearchStyles";
import useUserData from "../../hooks/useUserData";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay/lib";
import PageNames from "../../Constants/pageNames";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Constants/colors";

const SearchScreen = ({ route, navigation, id, token }) => {
  const [tripsSearchHistory, setTripsSearchHistory] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (id && token) fetchTripsSearchHistory();
  }, [id, token]);

  const fetchTripsSearchHistory = async () => {
    try {
      const { data } = await axios.get("/search/history/trips", {
        params: { id },
        headers: { Authorization: token },
      });

      setTripsSearchHistory(data.tripsSearchHistory);
    } catch (error) {
      console.log(error);
    }

    setIsFetched(true);
  };

  const handleOnHistoryPress = (departure, destination) => {
    navigation.navigate(PageNames.SEARCH_DATE_AND_TIME_SELECTION, {
      departure,
      destination,
      id,
      token,
    });
  };

  const handleOnProfilePress = () => {
    navigation.navigate(PageNames.PROFILE, { token });
  };

  return (
    <View style={SearchStyles.screenContainer}>
      {!isFetched ? (
        <Spinner visible={!isFetched} />
      ) : (
        <>
          <View style={SearchStyles.headerContainer}>
            <Header text={`Labas 👋`} size={Sizes.HEADER_MEDIUM} />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleOnProfilePress}
            >
              <Ionicons
                name="person-circle-outline"
                size={Sizes.ICON_LARGE}
                color={Colors.BLACK}
              />
            </TouchableOpacity>
          </View>
          <View style={SearchStyles.subHeaderContainer}>
            <Header
              text={"Kur planuojate kelionę?"}
              size={Sizes.HEADER_SMALL}
            />
          </View>
          <TripSearchForm navigation={navigation} route={route} />
          <FlatList
            data={tripsSearchHistory}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <SearchHistory
                departure={item.departure}
                destination={item.destination}
                onPress={handleOnHistoryPress}
              />
            )}
            style={SearchStyles.historyContainer}
          />
        </>
      )}
    </View>
  );
};

export default SearchScreen;
