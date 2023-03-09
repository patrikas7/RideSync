import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const NoResultsStyle = StyleSheet.create({
  containerStyling: {
    marginTop: "20%",
  },
  textContainer: {
    marginTop: 24,
  },
  primaryText: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryText: {
    color: Colors.GREY_700,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    marginTop: 8,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 36,
    alignItems: "center",
  },
  button: {
    width: "80%",
  },
});

export default NoResultsStyle;
