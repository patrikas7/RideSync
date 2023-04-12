import { View, ScrollView } from "react-native";
import TripInformationStyles from "./TripInformationStyle";
import TripRoutesCard from "./cards/TripRoutesCard";
import TripSearchRequestDetailsCard from "./cards/TripSearchRequestDetailsCard";
import Button from "../Button/Button";

const TripSearchRequest = ({ tripSearchRequest, onPress, navigation }) => {
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
            navigation={navigation}
            isMyProfile={tripSearchRequest.isUsersPost}
          />
        </ScrollView>

        <Button
          text={
            tripSearchRequest.isUsersPost
              ? "Naikinti skelbimą"
              : "Rašyti pranešimą"
          }
          styling={TripInformationStyles.button}
          onClick={onPress}
        />
      </View>
    </View>
  );
};

export default TripSearchRequest;
