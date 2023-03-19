import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TripInformationStyles from "./TripInformationStyle";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";

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
        <View>
          <View style={TripInformationStyles.infomrationPrimaryContainer}>
            <Ionicons name="cash" size={Sizes.ICON} color={Colors.BLACK} />
            <Text
              style={TripInformationStyles.infomrationPrimary}
            >{`${price}€`}</Text>
          </View>
          <Text style={TripInformationStyles.infomrationSecondary}>
            Asmeniui
          </Text>
        </View>

        <View>
          <View style={TripInformationStyles.infomrationPrimaryContainer}>
            <Ionicons name="people" size={Sizes.ICON} color={Colors.BLACK} />
            <Text style={TripInformationStyles.infomrationPrimary}>
              {personsCount}
            </Text>
          </View>
          <Text style={TripInformationStyles.infomrationSecondary}>Vietos</Text>
        </View>
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
