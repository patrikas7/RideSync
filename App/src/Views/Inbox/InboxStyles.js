import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const styles = StyleSheet.create({
  notificationContainer: {
    marginTop: 16,
    flex: 1,
  },
  notificationHeadline: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  notificationDate: {
    marginTop: 12,
    marginBottom: 32,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    color: Colors.GREY_600,
  },
  button: {
    marginBottom: 32,
  },
});

export default styles;
