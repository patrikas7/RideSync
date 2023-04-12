import { useState, useEffect } from "react";
import { printError } from "../../../Utils/utils";
import { showMessage } from "react-native-flash-message";
import useUserData from "../../../hooks/useUserData";
import PageNames from "../../../Constants/pageNames";
import useScreenArrowBack from "../../../hooks/useScreenArrowBack";
import axios from "axios";
import Container from "../../../Components/Container/Container";
import Spinner from "react-native-loading-spinner-overlay/lib";
import TripSearchRequest from "../../../Components/TripInformation/TripSearchRequest";
import useScreenIconRight from "../../../hooks/useScreenIconRight";
import Colors from "../../../Constants/colors";

const TripSearchRequestInformationScreen = ({ navigation, route }) => {
  const [tripSearchRequest, setTripSearchRequest] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;
  const { token } = useUserData();

  const handleOnEditPress = () => {};

  useScreenArrowBack(navigation, PageNames.TRIP_SEARCH_RESULTS);
  useScreenIconRight({
    navigation,
    icons: ["create-outline"],
    onPress: handleOnEditPress,
    shouldRender: tripSearchRequest.isUsersPost,
    color: Colors.BLACK,
  });

  useEffect(() => {
    if (!id || !token) return;

    const fetchTripSearchRequest = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/trip-search-requests/${id}`, {
          headers: { Authorization: token },
        });

        console.log(data);
        setTripSearchRequest(data.tripSearchRequest);
      } catch (error) {
        printError(error);
      }

      setIsLoading(false);
    };

    fetchTripSearchRequest();
  }, [id, token]);

  const handleOnButtonPress = () => {
    if (tripSearchRequest.isUsersPost) deleteRequest();
  };

  const deleteRequest = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/trip-search-requests/${tripSearchRequest._id}`, {
        headers: { Authorization: token },
      });

      showMessage({
        message: "Kelionės paieškos skelbimas buvo sėkmingai ištrintas",
        type: "success",
      });

      navigation.navigate(PageNames.TRIP_SEARCH_RESULTS);
    } catch (error) {
      printError(error);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <TripSearchRequest
          tripSearchRequest={tripSearchRequest}
          onPress={handleOnButtonPress}
          navigation={navigation}
          route={route}
        />
      )}
    </Container>
  );
};

export default TripSearchRequestInformationScreen;
