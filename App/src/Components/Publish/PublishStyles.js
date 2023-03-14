import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

export const PublishInformationFormStyles = StyleSheet.create({
  formContainer: {
    marginTop: 16,
    flex: 1,
  },
  fieldsContainer: {
    flex: 1,
  },
  button: {
    marginBottom: 32,
  },
  multiline: {
    marginTop: 24,
  },
});

export const PublishInformationStyles = StyleSheet.create({
  container: {
    marginTop: 16,
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
  },
  routeCard: {
    backgroundColor: Colors.PINK_100,
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    padding: 16,
  },
  cardHeadline: {
    fontWeight: "bold",
  },
  cardListItem: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 12,
  },
  cardListItemTextContainer: {
    marginLeft: 8,
  },
  cardListItemText: {
    color: Colors.GREY_500,
    fontWeight: "bold",
  },
  detailsCard: {
    backgroundColor: Colors.LIGHT_BLUE,
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
    padding: 16,
    marginTop: 8,
  },
  button: {
    marginBottom: 32,
  },
});
