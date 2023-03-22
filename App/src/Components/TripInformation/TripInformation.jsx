import { ScrollView, View } from "react-native";
import TripInformationStyles from "./TripInformationStyle";
import TripRoutesCard from "./TripRoutesCard";
import TripDetailsCard from "./TripDetailsCard";
import TripDriverCard from "./TripDriverCard";
import Button from "../Button/Button";
import TextButton from "../Button/TextButton";

const TripInformation = ({ trip }) => {
  return (
    <View style={TripInformationStyles.inforamtionWrapper}>
      <View style={TripInformationStyles.scrollWrapper}>
        <ScrollView style={TripInformationStyles.container}>
          <TripRoutesCard
            departure={trip.departure}
            destination={trip.destination}
            time={trip.time}
            stops={trip.stops}
          />
          <TripDetailsCard
            personsCount={trip.personsCount}
            price={trip.price}
            comments={trip.comments}
          />
          <TripDriverCard
            name={trip.driver.name}
            surname={trip.driver.surname}
            isUserDriver={trip.isUserDriver}
          />

          {!trip.isUserDriver && (
            <TextButton
              text={"Pranešti apie kelionę"}
              onPress={() => console.log()}
              styling={{ marginTop: 32 }}
              icon={"alert-outline"}
            />
          )}
        </ScrollView>

        <Button
          text={trip.isUserDriver ? "Atšaukti kelionę" : "Rezervuoti vietą"}
          styling={TripInformationStyles.button}
        />
      </View>
    </View>
  );
};

export default TripInformation;
