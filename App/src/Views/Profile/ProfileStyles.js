import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import StyleUtils from "../../Utils/styleUtils";

export const ProfileScreenStyles = StyleSheet.create({
  avatar: {
    ...StyleUtils.avatar,
    width: 35,
    height: 35,
    marginRight: 16,
  },
  headerContainer: {
    marginTop: 16,
    borderTopColor: Colors.GREY,
    borderBottomColor: Colors.GREY,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    color: Colors.GREY_600,
    fontWeight: "500",
  },
  userName: {
    marginTop: 4,
    fontWeight: "bold",
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
  },
  optionsList: {
    marginTop: 24,
  },
});

export const ProfileDetailsScreenStyles = StyleSheet.create({
  listItem: {
    paddingVertical: 8,
  },
});

export const ProfileValueEditScreenStyles = StyleSheet.create({
  input: {
    marginTop: 16,
  },
  button: {
    marginBottom: 32,
  },
  container: {
    flex: 1,
  },
});
