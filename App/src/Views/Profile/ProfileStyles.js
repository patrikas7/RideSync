import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import StyleUtils from "../../Utils/styleUtils";

export const ProfileScreenStyles = StyleSheet.create({
  avatar: {
    ...StyleUtils.avatar,
    width: 40,
    height: 40,
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
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    gap: 16,
  },
  imageCard: {
    ...StyleUtils.card,
  },
  imageCardActive: {
    backgroundColor: Colors.HIGHLIGHT_UNDERLAY,
  },
  imageCardLeft: {
    marginLeft: 16,
  },
  image: {
    width: 125,
    height: 125,
  },
  imageText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
});

export const ProfileSettingsStyles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    marginTop: 64,
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderColor: Colors.BLACK,
    borderWidth: 2,
    alignSelf: "center",
  },
  buttonsContainer: {
    marginBottom: 32,
  },

  firstButton: {
    marginBottom: 32,
  },
});
