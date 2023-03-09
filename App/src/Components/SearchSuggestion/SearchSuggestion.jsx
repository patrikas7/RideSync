import { View, TouchableHighlight, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchSuggestionStyles from "./SearchSuggestionStyles";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import PropTypes from "prop-types";

const SearchSuggestion = ({ onPress, suggestion }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.6}
      underlayColor={Colors.HIGHLIGHT_UNDERLAY}
      style={SearchSuggestionStyles.touchableHighlight}
    >
      <View style={SearchSuggestionStyles.result}>
        <View>
          <Text style={SearchSuggestionStyles.primaryText}>
            {suggestion.addressLine1}
          </Text>
          <Text style={SearchSuggestionStyles.secondaryText}>
            {suggestion.addressLine2}
          </Text>
        </View>
        <Ionicons
          name="arrow-forward-outline"
          size={Sizes.ICON}
          style={SearchSuggestionStyles.resultIcon}
        />
      </View>
    </TouchableHighlight>
  );
};

SearchSuggestion.propTypes = {
  onPress: PropTypes.func.isRequired,
  suggestion: PropTypes.shape({
    addressLine1: PropTypes.string.isRequired,
    addressLine2: PropTypes.string.isRequired,
  }),
};

export default SearchSuggestion;
