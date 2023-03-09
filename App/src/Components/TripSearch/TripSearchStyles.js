import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";

const TripSearchStyles = StyleSheet.create({
  searchContainer: {
    marginTop: 16,
  },
  formContainer: {
    marginBottom: 16,
  },
  inlineInputContainer: {
    flexDirection: "row",
  },
  inlineInput: {
    flex: 1,
  },
  historyElement: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  tripDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 32,
  },
  tripDetailsText: {
    fontSize: 18,
    color: Colors.BLACK_100,
    fontWeight: "bold",
  },
  tripDetailsTextIcon: {
    marginHorizontal: 8,
  },
  tripDetailsIcon: {
    marginLeft: "auto",
  },
  touchableHighlight: {
    borderRadius: 10,
  },
});

export default TripSearchStyles;
