import { useEffect, useState } from "react";
import { View } from "react-native";
import InputSearch from "../../Components/Form/InputSearch";
import Pills from "../../Components/Pills/Pills";
import Pill from "../../Components/Pills/Pill";
import SearchStyles from "./SearchStyles";
import {
  useForegroundPermissions,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
} from "expo-location";
import useDebounce from "../../hooks/useDebounce";
import PageNames from "../../Constants/pageNames";
import SearchSuggestion from "../../Components/SearchSuggestion/SearchSuggestion";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import useUserData from "../../hooks/useUserData";
import { useIsFocused } from "@react-navigation/native";

// Mirsta appsasa atidarius citySearch su klaipeda, su kitais miestais lyg viskas okey

const CitySearchScreen = ({ route, navigation }) => {
  const { inputType, value, prevScreen } = route.params;
  const [searchTerm, setSearchTerm] = useState(value);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [status, requestPermission] = useForegroundPermissions();
  const debouncedSearchTerm = useDebounce(searchTerm);
  const { token, id } = useUserData();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (token && id) getSearchHistory();
  }, [token, id]);

  useEffect(() => {
    if (debouncedSearchTerm && token) getSuggestions();
  }, [debouncedSearchTerm, token]);

  const getSuggestions = async () => {
    try {
      const { data } = await axios.get("/search", {
        params: { text: debouncedSearchTerm },
        headers: { Authorization: token },
      });
      setSuggestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchHistory = async () => {
    try {
      const { data } = await axios.get("/search/history", {
        params: { id, type: inputType },
        headers: { Authorization: token },
      });

      setSearchHistory(data?.searchHistory);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const handleOnUseCurrentLocationPress = async () => {
    if (status.granted) {
      getUserCity();
      return;
    }
    if (!status.granted && status.canAskAgain) {
      const { granted } = await requestPermission();
      if (granted) getUserCity();
      return;
    }
  };

  const getUserCity = async () => {
    try {
      const location = await getCurrentPositionAsync({});
      const address = await reverseGeocodeAsync(location.coords);
      setSearchTerm(address[0]?.city);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnSuggestionPress = (suggestion) => {
    saveSearchHistory(suggestion.addressLine1);
    navigation.navigate(PageNames.HOME, {
      screen: prevScreen,
      [inputType]: {
        addressLine1: suggestion.addressLine1,
        addressLine2: suggestion.addressLine2,
        city: suggestion.city,
        latitude: suggestion.latitude,
        longitude: suggestion.longitude,
      },
    });
  };

  const saveSearchHistory = async (addressLine1) => {
    try {
      await axios.post(
        "/search/history",
        {
          id,
          type: inputType,
          text: addressLine1,
        },
        { headers: { Authorization: token } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (!isFocused) return null;

  return (
    <View style={SearchStyles.citySearchContainer}>
      <Spinner visible={isLoading} />
      <View>
        <InputSearch
          placeholder="Įveskite ieškoma vietą"
          value={searchTerm}
          onChange={setSearchTerm}
          onBack={() => navigation.navigate(PageNames.HOME)}
        />
        <View style={SearchStyles.citySearchPillsContainer}>
          <Pills
            pills={searchHistory}
            onPress={(text) => setSearchTerm(text)}
            children={
              <Pill
                text="Dabartinė lokacija"
                icon="location-outline"
                onPress={handleOnUseCurrentLocationPress}
              />
            }
          />
        </View>
        <View style={SearchStyles.resultsContainer}>
          {suggestions.map((suggesstion, index) => (
            <SearchSuggestion
              key={index}
              onPress={() => handleOnSuggestionPress(suggesstion)}
              suggestion={suggesstion}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CitySearchScreen;
