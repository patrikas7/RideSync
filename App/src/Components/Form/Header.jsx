import PropTypes from "prop-types";
import { Text, View } from "react-native";
import Sizes from "../../Constants/sizes";

const Header = ({ text, containerStyling, size = Sizes.HEADER_LARGE }) => {
  return (
    <View style={containerStyling}>
      <Text style={{ fontWeight: "bold", fontSize: size }}>{text}</Text>
    </View>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  containerStyling: PropTypes.object,
  size: PropTypes.number,
};

export default Header;
