import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableHighlight } from "react-native";
import { ListItemStyles } from "./ListStyles";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";

const ListItem = ({ icon, text, onPress }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.6}
      underlayColor={Colors.HIGHLIGHT_UNDERLAY}
      style={ListItemStyles.touchableHighlight}
    >
      <View style={ListItemStyles.listItem}>
        <Ionicons name={icon} size={Sizes.ICON} color={Colors.BLACK} />
        <Text style={ListItemStyles.listItemText}>{text}</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={Colors.GREY_600}
          style={ListItemStyles.arrowIcon}
        />
      </View>
    </TouchableHighlight>
  );
};

export default ListItem;
