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
  const [isFetched, setIsFetched] = useState(false);
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
          </View>
          <TripSearchForm navigation={navigation} route={route} />
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
