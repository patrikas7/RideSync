import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const RegistrationStyles = StyleSheet.create({
  inputsContainer: {
    marginVertical: 24,
  },
  input: {
    marginTop: 16,
  },
  genderHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  genderText: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    color: Colors.PLACEHOLDER,
    marginLeft: 12,
    borderBottomColor: Colors.GREY,
    borderBottomWidth: 1,
  },
});

export default RegistrationStyles;
