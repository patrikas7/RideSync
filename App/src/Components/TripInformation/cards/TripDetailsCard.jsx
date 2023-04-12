import { View, Text } from "react-native";
import TripInformationStyles from "../TripInformationStyle";
import TripDetail from "./TripDetail";

const TripDetailsCard = ({ personsCount, comments, price }) => {
  return (
    <View
      style={[
        TripInformationStyles.infoCard,
        TripInformationStyles.notFirstChild,
        TripInformationStyles.detailsCard,
      ]}
    >
      <View style={TripInformationStyles.detailsWrapper}>
        <TripDetail
          icon={"cash"}
          primaryText={`${price}€`}
          secondaryText={"Asmeniui"}
        />

        <TripDetail
          icon={"people"}
          primaryText={personsCount}
          secondaryText={"Vietos"}
        />
      </View>
      {comments && (
        <View style={TripInformationStyles.commentsContainer}>
          <Text>
            <Text style={TripInformationStyles.bold}>Komentarai: </Text>
            <Text>{comments}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default TripDetailsCard;
