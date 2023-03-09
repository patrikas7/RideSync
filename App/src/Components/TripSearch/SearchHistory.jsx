import { Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableHighlight } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import TripSearchStyles from "./TripSearchStyles";

const SearchHistory = ({ departure, destination }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={Colors.HIGHLIGHT_UNDERLAY}
      style={TripSearchStyles.touchableHighlight}
      onPress={() => console.log("tesr")}
    >
      <View style={TripSearchStyles.historyElement}>
        <Ionicons
          name={"time-outline"}
          size={Sizes.ICON}
          color={Colors.BLACK_100}
        />
        <View style={TripSearchStyles.tripDetails}>
          <Text style={TripSearchStyles.tripDetailsText}>{departure}</Text>
          <Ionicons
            name="arrow-forward-outline"
            size={Sizes.ICON}
            color={Colors.BLACK_100}
            style={TripSearchStyles.tripDetailsTextIcon}
          />
          <Text style={TripSearchStyles.tripDetailsText}>{destination}</Text>
        </View>

        <Ionicons
          name="chevron-forward-outline"
          size={Sizes.ICON}
          color={Colors.BLACK_100}
          style={TripSearchStyles.tripDetailsIcon}
        />
      </View>
    </TouchableHighlight>
  );
};

export default SearchHistory;
