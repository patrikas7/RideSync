import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TripInformationStyles from "../TripInformationStyle";
import Colors from "../../../Constants/colors";
import Sizes from "../../../Constants/sizes";

const TripDetail = ({ size, styling, icon, primaryText, secondaryText }) => {
  const isSamll = size === "small";

  return (
    <View style={styling}>
      <View style={TripInformationStyles.infomrationPrimaryContainer}>
        <Ionicons
          name={icon}
          size={isSamll ? Sizes.ICON_SMALL : Sizes.ICON}
          color={Colors.BLACK}
        />
        <Text
          style={
            isSamll
              ? TripInformationStyles.infomrationPrimarySmall
              : TripInformationStyles.infomrationPrimary
          }
        >
          {primaryText}
        </Text>
      </View>
      <Text
        style={
          isSamll
            ? TripInformationStyles.infomrationSecondarySamll
            : TripInformationStyles.infomrationSecondary
        }
      >
        {secondaryText}
      </Text>
    </View>
  );
};

export default TripDetail;
