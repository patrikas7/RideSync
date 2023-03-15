import { Text, View } from "react-native";
import { PublishInformationStyles } from "./PublishStyles";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import useUserData from "../../hooks/useUserData";
import Spinner from "react-native-loading-spinner-overlay";
import PublishInformationCardListItem from "./PublishInformationCardListItem";
import Button from "../Button/Button";
import ErrorMessages from "../../Constants/errorMessages";
import axios from "axios";
import PageNames from "../../Constants/pageNames";
import { resetState } from "../../redux/publish/publishSlice";

const PublishInformation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state.publish);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id, token } = useUserData();

  const handleOnConfimration = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        "/trips",
        { ...state, id },
        { headers: { Authorization: token } }
      );

      dispatch(resetState());
      navigation.navigate(PageNames.PUBLISH_SUCCES);
    } catch (error) {
      console.log(error);
      showMessage({
        message: ErrorMessages.UNEXPECTED_ERROR,
        type: "danger",
      });
    }

    setIsLoading(false);
  };

  console.log(state);
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
          <PublishInformationCardListItem
            text={`Kaina keleiviui: ${state.price}`}
            icon="cash-outline"
          />
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
