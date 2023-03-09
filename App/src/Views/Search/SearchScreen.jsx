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
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Constants/colors";

const SearchScreen = ({ route, navigation }) => {
  const [tripsSearchHistory, setTripsSearchHistory] = useState([]);
  const [isStarIconVisible, setIsStarIconVisible] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { name, id, token } = useUserData();

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

  const handleOnBookmarkPress = () => {
    setIsFavorite((prevState) => !prevState);
  };

  return (
    <View style={SearchStyles.screenContainer}>
      {!isFetched ? (
        <Spinner visible={!isFetched} />
      ) : (
        <>
          <Header
            text={`Labas ${name || ""}! 👋`}
            size={Sizes.HEADER_MEDIUM}
            containerStyling={SearchStyles.headerContainer}
          />
          <View style={SearchStyles.subHeaderContainer}>
            <Header
              text={"Kur planuojate kelionę?"}
              size={Sizes.HEADER_SMALL}
            />
            {isStarIconVisible && (
              <TouchableOpacity
                onPress={handleOnBookmarkPress}
                activeOpacity={0.6}
              >
                <Ionicons
                  name={isFavorite ? "star" : "star-outline"}
                  size={Sizes.ICON}
                  color={Colors.BLUE_500}
                />
              </TouchableOpacity>
            )}
          </View>
          <TripSearchForm
            navigation={navigation}
            route={route}
            setIsStarIconVisible={setIsStarIconVisible}
            setIsFavorite={setIsFavorite}
          />
          <FlatList
            data={tripsSearchHistory}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <SearchHistory
                departure={item.departure}
                destination={item.destination}
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
