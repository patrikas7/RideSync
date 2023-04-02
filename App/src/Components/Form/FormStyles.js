import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

export const InputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 8,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    marginLeft: 12,
  },
  multiLineInput: {
    height: 75,
  },
  inputError: {
    borderBottomColor: Colors.RED,
  },
  errorContainer: {
    minHeight: 12,
    marginTop: 4,
    marginLeft: Sizes.ICON + 12,
  },
  errorText: {
    color: Colors.RED,
  },
  disabled: {
    color: Colors.GREY_600,
  },
});

export const InputSearchStyles = StyleSheet.create({
  inputSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderColor: Colors.BLUE_500,
    borderWidth: 1,
    borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
  },
  inputContainer: {
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    overflow: "hidden",
    flex: 1,
  },
  deleteIcon: {
    marginLeft: "auto",
    borderLeftColor: Colors.PLACEHOLDER,
    borderLeftWidth: 1,
    paddingLeft: 4,
  },
});

export const InputSwitchStyles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  text: {
    flex: 1,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
  },
});

export const getDropdownStyles = (isOpen) =>
  StyleSheet.create({
    inputIOS: {
      fontSize: Sizes.DEFAULT_TEXT_SIZE,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: isOpen ? 2 : 1,
      borderColor: Colors.BLUE_500,
      borderRadius: Sizes.DEFAULT_BORDER_RADIUS,
      color: Colors.BLACK,
      marginTop: 16,
    },
  });
