import { Text, View } from "react-native";
import TripInformationStyles from "./TripInformationStyle";
import PassengerInformation from "./PassengerInformation";
import PageNames from "../../Constants/pageNames";

const TripPassengersCard = ({ passengers, navigation, userId }) => {
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
            onPress={(profilePictureUri) =>
              navigation.navigate(PageNames.USER_INFORMATION, {
                user: passenger.passenger,
                profilePictureUri,
                isMyProfile: passenger.passenger._id === userId,
              })
            }
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
