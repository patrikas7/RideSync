import { Text, View } from "react-native";
import TripInformationStyles from "./TripInformationStyle";
import PassengerInformation from "./PassengerInformation";

const TripPassengersCard = ({ passengers }) => {
  return (
    <View
      style={[
        TripInformationStyles.infoCard,
        TripInformationStyles.notFirstChild,
        TripInformationStyles.passengersCard,
      ]}
    >
      <Text style={TripInformationStyles.passengersHeadline}>Keleiviai</Text>
      <View style={TripInformationStyles.passengersList}>
        {passengers.map((passenger, index) => (
          <PassengerInformation
            key={index}
            passenger={passenger.passenger}
            seatsBooked={passenger.seatsBooked}
            onPress={() => console.log()}
            styling={
              index > 0 ? TripInformationStyles.passengerInfoNotFirst : {}
            }
          />
        ))}
      </View>
    </View>
  );
};

export default TripPassengersCard;
