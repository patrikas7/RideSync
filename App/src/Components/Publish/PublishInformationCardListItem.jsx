import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { PublishInformationStyles } from "./PublishStyles";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";

const PublishInformationCardListItem = ({ text, icon }) => {
  return (
    <View style={PublishInformationStyles.cardListItem}>
      <Ionicons name={icon} size={Sizes.ICON_SMALL} color={Colors.GREY_500} />
      <View style={PublishInformationStyles.cardListItemTextContainer}>
        <Text style={PublishInformationStyles.cardListItemText}>{text}</Text>
      </View>
    </View>
  );
};

export default PublishInformationCardListItem;
