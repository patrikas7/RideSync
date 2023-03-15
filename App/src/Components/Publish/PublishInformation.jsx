import { Text, View } from "react-native";
import { PublishInformationStyles } from "./PublishStyles";
import { useSelector } from "react-redux";
import PublishInformationCardListItem from "./PublishInformationCardListItem";
import Button from "../Button/Button";

const PublishInformation = () => {
  const state = useSelector((state) => state.publish);

  console.log(state);
  return (
    <View style={PublishInformationStyles.container}>
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
      />
    </View>
  );
};

export default PublishInformation;
