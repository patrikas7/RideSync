import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

export const IconButtonSyles = StyleSheet.create({
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export const TextButtonStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Colors.BLUE,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    marginLeft: 4,
  },
});

export const ButtonStyles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 12,
    marginHorizontal: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    paddingVertical: 12,
  },
  buttonInnerContainerBlue: { backgroundColor: Colors.BLUE_500 },
  buttonInnerContainerGrey: { backgroundColor: Colors.GREY_400 },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextColorBlue: { color: Colors.WHITE },
  buttonTextColorGrey: { color: Colors.GREY_600 },
  pressed: {
    opacity: 0.75,
  },
  disabledButton: {
    backgroundColor: Colors.DISABLED,
  },
});
