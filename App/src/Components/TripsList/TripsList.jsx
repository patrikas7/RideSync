import { FlatList } from "react-native";
import TripCard from "./TripCard";
import TripsListStyle from "./TripsListStyle";

const TripsList = ({ tripsList, onPress }) => {
  const renderItem = ({ item, index }) => (
    <TripCard
      trip={item}
      containerStyling={index > 0 ? TripsListStyle.notFirstItem : ""}
      onPress={onPress}
    />
  );

  return (
    <FlatList
      data={tripsList}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      style={TripsListStyle.tripsContainer}
    />
  );
};

export default TripsList;
