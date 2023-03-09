import PropTypes from "prop-types";
import { Text, View } from "react-native";
import Button from "../Button/Button";
import NoResultsSVG from "../Svg/NoResults";
import NoResultsStyle from "./NoResultsStyles";

const NoResults = ({ primaryText, secondaryText, buttonText, onPress }) => {
  return (
    <View style={NoResultsStyle.containerStyling}>
      <NoResultsSVG />
      <View style={NoResultsStyle.textContainer}>
        <Text style={NoResultsStyle.primaryText}>{primaryText}</Text>
        {secondaryText && (
          <Text style={NoResultsStyle.secondaryText}>{secondaryText}</Text>
        )}
      </View>
      {buttonText && (
        <View style={NoResultsStyle.buttonContainer}>
          <Button
            text={buttonText}
            onClick={onPress}
            styling={NoResultsStyle.button}
          />
        </View>
      )}
    </View>
  );
};

NoResults.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  buttonText: PropTypes.string,
  onPress: PropTypes.func,
};

export default NoResults;
