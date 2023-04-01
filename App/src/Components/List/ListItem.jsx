import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableHighlight } from "react-native";
import { ListItemStyles } from "./ListStyles";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";

const ListItem = ({ icon, text, secondaryText, onPress, itemStyling }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.6}
      underlayColor={Colors.HIGHLIGHT_UNDERLAY}
      style={ListItemStyles.touchableHighlight}
    >
      <View style={[ListItemStyles.listItem, itemStyling]}>
        <Ionicons name={icon} size={Sizes.ICON} color={Colors.BLACK} />
        <View style={ListItemStyles.textContainer}>
          <Text
            style={
              secondaryText
                ? ListItemStyles.listItemTextFirst
                : ListItemStyles.listItemText
            }
          >
            {text}
          </Text>
          {secondaryText && (
            <Text style={ListItemStyles.listItemSecondaryText}>
              {secondaryText}
            </Text>
          )}
        </View>

        {onPress && (
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={Colors.GREY_600}
            style={ListItemStyles.arrowIcon}
          />
        )}
      </View>
    </TouchableHighlight>
  );
};

export default ListItem;
