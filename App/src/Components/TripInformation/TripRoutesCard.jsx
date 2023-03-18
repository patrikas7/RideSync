import { View, Text } from "react-native";
import TripInformationStyles from "./TripInformationStyle";
import MainStop from "../StopsList/MainStop";
import Colors from "../../Constants/colors";

const TripRoutesCard = ({ departure, destination, time }) => {
  return (
    <View style={TripInformationStyles.infoCard}>
      <View style={TripInformationStyles.routes}>
        <MainStop
          stop={departure}
          icon={"location"}
          color={Colors.BLACK}
          secondaryTextStyling={TripInformationStyles.routeSecondaryText}
        />
        <View style={TripInformationStyles.separator}></View>
        <MainStop
          stop={destination}
          icon={"location"}
          color={Colors.BLACK}
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
