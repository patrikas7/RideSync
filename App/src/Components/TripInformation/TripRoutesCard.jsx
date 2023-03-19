import { View, Text } from "react-native";
import TripInformationStyles from "./TripInformationStyle";
import MainStop from "../StopsList/MainStop";
import Colors from "../../Constants/colors";
import { Fragment } from "react";

const TripRoutesCard = ({ departure, destination, time, stops }) => {
  return (
    <View style={TripInformationStyles.infoCard}>
      <View style={TripInformationStyles.routes}>
        <MainStop
          stop={departure}
          icon={"location"}
          color={Colors.BLUE_500}
          secondaryTextStyling={TripInformationStyles.routeSecondaryText}
        />
        {stops.map((stop, index) => (
          <Fragment key={index}>
            <View style={TripInformationStyles.separator}></View>
            <MainStop
              stop={stop}
              icon={"location"}
              color={Colors.BLUE_500}
              secondaryTextStyling={TripInformationStyles.routeSecondaryText}
            />
          </Fragment>
        ))}
        <View style={TripInformationStyles.separator}></View>
        <MainStop
          stop={destination}
          icon={"location"}
          color={Colors.BLUE_500}
          secondaryTextStyling={TripInformationStyles.routeSecondaryText}
        />
      </View>
      <View style={TripInformationStyles.timeContainer}>
        <Text style={TripInformationStyles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default TripRoutesCard;
