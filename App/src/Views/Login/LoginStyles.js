import { StyleSheet } from "react-native";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";

const LoginStyles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  buttonsContainer: {
    marginTop: 12,
  },
  delimiterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  delimiterLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.GREY,
  },
  delimiterText: {
    color: Colors.GREY_500,
    textAlign: "center",
    width: 50,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
  },
  image: {
    height: 310,
    width: "100%",
  },
});

export default LoginStyles;
