import { View, ScrollView } from "react-native";
import TripInformationStyles from "./TripInformationStyle";
import TripRoutesCard from "./card/TripRoutesCard";
import TripSearchRequestDetailsCard from "./cards/TripSearchRequestDetailsCard";

const TripSearchRequest = ({ tripSearchRequest }) => {
  console.log(tripSearchRequest);
  return (
    <View style={TripInformationStyles.inforamtionWrapper}>
      <View style={TripInformationStyles.scrollWrapper}>
        <ScrollView style={TripInformationStyles.container}>
          <TripRoutesCard
            departure={tripSearchRequest.departure}
            destination={tripSearchRequest.destination}
            time={tripSearchRequest.time}
          />

          <TripSearchRequestDetailsCard />
        </ScrollView>
      </View>
    </View>
  );
};

export default TripSearchRequest;
