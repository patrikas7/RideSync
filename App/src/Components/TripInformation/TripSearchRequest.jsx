import { View, ScrollView } from "react-native";
import TripInformationStyles from "./TripInformationStyle";
import TripRoutesCard from "./cards/TripRoutesCard";
import TripSearchRequestDetailsCard from "./cards/TripSearchRequestDetailsCard";
import Button from "../Button/Button";

const TripSearchRequest = ({ tripSearchRequest }) => {
  return (
    <View style={TripInformationStyles.inforamtionWrapper}>
      <View style={TripInformationStyles.scrollWrapper}>
        <ScrollView style={TripInformationStyles.container}>
          <TripRoutesCard
            departure={tripSearchRequest.departure}
            destination={tripSearchRequest.destination}
            time={tripSearchRequest.time}
          />

          <TripSearchRequestDetailsCard
            user={tripSearchRequest.user}
            passengersCount={tripSearchRequest.passengersCount}
            comments={tripSearchRequest.comments}
          />
        </ScrollView>
        <Button
          text={"Rašyti pranešimą"}
          styling={TripInformationStyles.button}
        />
      </View>
    </View>
  );
};

export default TripSearchRequest;
