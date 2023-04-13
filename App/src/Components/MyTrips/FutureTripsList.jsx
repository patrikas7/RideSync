import { View, Text, ScrollView } from "react-native";
import PageNames from "../../Constants/pageNames";
import TextButton from "../Button/TextButton";
import TripCard from "../TripsList/TripCard";
import { FutureTripsStyles } from "./MyTripsStyle";

const FutureTripsList = ({
  driverTrips,
  passengerTrips,
  tripSearchRequests,
  onTripPress,
}) => {
  return (
    <ScrollView>
      {driverTrips?.length > 0 && (
        <View style={FutureTripsStyles.tripsSection}>
          <Text style={FutureTripsStyles.headline}>
            Kelionės, kur esu vairuotojos 🚗
          </Text>
          {driverTrips.map((trip, index) => (
            <TripCard
              key={index}
              trip={trip}
              onPress={(id) => onTripPress(id, PageNames.TRIP_INFORMATION)}
              containerStyling={
                index > 0
                  ? FutureTripsStyles.notFirstItem
                  : FutureTripsStyles.firstItem
              }
            />
          ))}
        </View>
      )}
      {passengerTrips?.length > 0 && (
        <View style={FutureTripsStyles.tripsSection}>
          <Text style={FutureTripsStyles.headline}>
            Kelionės, kur esu keleivis 💺
          </Text>
          {passengerTrips.map((trip, index) => (
            <TripCard
              key={index}
              trip={trip}
              onPress={(id) => onTripPress(id, PageNames.TRIP_INFORMATION)}
              containerStyling={
                index > 0
                  ? FutureTripsStyles.notFirstItem
                  : FutureTripsStyles.firstItem
              }
            />
          ))}
        </View>
      )}
      {tripSearchRequests?.length > 0 && (
        <View style={FutureTripsStyles.tripsSection}>
          <Text style={FutureTripsStyles.headline}>
            Mano kelionių paieškos užklausos 🔎
          </Text>
          {tripSearchRequests.map((trip, index) => (
            <TripCard
              key={index}
              trip={trip}
              onPress={(id) =>
                onTripPress(id, PageNames.TRIP_SEARCH_REQUEST_INFORMATION)
              }
              containerStyling={
                index > 0
                  ? FutureTripsStyles.notFirstItem
                  : FutureTripsStyles.firstItem
              }
            />
          ))}
        </View>
      )}
      <TextButton
        text={"Kelionių istorija"}
        onPress={() => console.log()}
        styling={{ marginVertical: 32 }}
        icon={"time-outline"}
      />
    </ScrollView>
  );
};

export default FutureTripsList;
