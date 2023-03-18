import { View } from "react-native";
import TripCard from "./TripCard";
import TripsListStyle from "./TripsListStyle";

const TripsList = () => {
  return (
    <View style={TripsListStyle.tripsContainer}>
      <TripCard />
    </View>
  );
};

export default TripsList;
