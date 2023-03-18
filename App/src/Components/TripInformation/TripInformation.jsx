import { View } from "react-native";
import TripInformationStyles from "./TripInformationStyle";
import TripRoutesCard from "./TripRoutesCard";
import TripDetailsCard from "./TripDetailsCard";

// Add stops

const TripInformation = ({ trip }) => {
  return (
    <View style={TripInformationStyles.container}>
      <TripRoutesCard
        departure={trip.departure}
        destination={trip.destination}
        time={trip.time}
      />

      <TripDetailsCard
        personsCount={trip.personsCount}
        price={trip.price}
        comments={trip.comments}
      />
    </View>
  );
};

export default TripInformation;
