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
    fontSize: 16,
    marginLeft: 12,
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
});

export const InputSearchStyles = StyleSheet.create({
  inputSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderColor: Colors.BLUE_500,
    borderWidth: 1,
    borderRadius: 10,
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
  },
  deleteIcon: {
    marginLeft: "auto",
    borderLeftColor: Colors.PLACEHOLDER,
    borderLeftWidth: 1,
    paddingLeft: 4,
  },
});
