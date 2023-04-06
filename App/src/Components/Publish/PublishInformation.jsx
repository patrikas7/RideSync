import { Text, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  PublishTypes,
  resetErrors,
  resetState,
} from "../../redux/publish/publishSlice";
import { printError } from "../../Utils/utils";
import { PublishInformationStyles } from "./PublishStyles";
import useUserData from "../../hooks/useUserData";
import Spinner from "react-native-loading-spinner-overlay";
import PublishInformationCardListItem from "./PublishInformationCardListItem";
import Button from "../Button/Button";
import axios from "axios";
import PageNames from "../../Constants/pageNames";

const PublishInformation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state.publish);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id, token } = useUserData();

  const handleOnConfimration = async () => {
    setIsLoading(true);
    const isTripPublish = state.publishType === PublishTypes.PUBLISH_TRIP;
    try {
      const postFunction = isTripPublish ? postTrip : postTripSearchRequest;
      await postFunction();

      dispatch(resetState());
      dispatch(resetErrors());
      navigation.navigate(PageNames.PUBLISH_SUCCES, { isTripPublish });
    } catch (error) {
      printError(error);
    }

    setIsLoading(false);
  };

  const postTrip = async () => {
    const { publishType, ...publishTrip } = state;

    await axios.post(
      "/trips",
      { ...publishTrip, id },
      { headers: { Authorization: token } }
    );
  };

  const postTripSearchRequest = async () => {
    await axios.post(
      "/trip-search-requests",
      {
        departure: state.departure,
        destination: state.destination,
        date: state.date,
        time: state.time,
        passengersCount: state.personsCount,
        comments: state.comments,
      },
      { headers: { Authorization: token } }
    );
  };

  return (
    <View style={PublishInformationStyles.container}>
      <Spinner visible={isLoading} />
      <View style={PublishInformationStyles.cardsContainer}>
        <View style={PublishInformationStyles.routeCard}>
          <Text style={PublishInformationStyles.cardHeadline}>
            Kelionės sustojimų informacija
          </Text>
          <PublishInformationCardListItem
            text={`Išvykimas: ${state.departure.addressLine1} ${state.departure.addressLine2}`}
            icon="flag-outline"
          />
          {state.stops.map((stop, index) => (
            <PublishInformationCardListItem
              key={index}
              text={`Sustojimas: ${stop.addressLine1} ${stop.addressLine2}`}
              icon="stop-circle-outline"
            />
          ))}
          <PublishInformationCardListItem
            text={`Atvykimas: ${state.destination.addressLine1} ${state.destination.addressLine2}`}
            icon="flag-outline"
          />
        </View>
        <View style={PublishInformationStyles.detailsCard}>
          <Text style={PublishInformationStyles.cardHeadline}>
            Kelionės informacija
          </Text>
          <PublishInformationCardListItem
            text={`Išvykimo data: ${state.date}`}
            icon="calendar-outline"
          />
          <PublishInformationCardListItem
            text={`Išvykimo laikas: ${state.time}`}
            icon="time-outline"
          />
          <PublishInformationCardListItem
            text={`Keleivių skaičius: ${state.personsCount}`}
            icon="people-outline"
          />
          {state.price && (
            <PublishInformationCardListItem
              text={`Kaina keleiviui: ${state.price}`}
              icon="cash-outline"
            />
          )}
          {state.isRoundTrip && (
            <>
              <PublishInformationCardListItem
                text={`Grįžimo išvykimo data: ${state.date}`}
                icon="calendar-outline"
              />
              <PublishInformationCardListItem
                text={`Grįžimo išvykimo laikas: ${state.time}`}
                icon="time-outline"
              />
            </>
          )}
          {state.comments && (
            <PublishInformationCardListItem
              text={`Komentarai: ${state.comments}`}
              icon="chatbubble-outline"
            />
          )}
        </View>
      </View>

      <Button
        text={"Patvirtinti kelionę"}
        styling={PublishInformationStyles.button}
        onClick={handleOnConfimration}
      />
    </View>
  );
};

export default PublishInformation;
