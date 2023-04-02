import { StyleSheet } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import StyleUtils from "../../Utils/styleUtils";

const styles = StyleSheet.create({
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.GREY_600,
    borderBottomWidth: 1,
    paddingBottom: 24,
    marginTop: 16,
  },
  avatar: {
    ...StyleUtils.avatar,
    width: 40,
    height: 40,
    borderColor: Colors.GREY_600,
  },
  headerText: {
    marginLeft: 16,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    fontWeight: "bold",
  },
  closeIcon: {
    marginLeft: "auto",
  },
  chatContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 32,
    backgroundColor: Colors.CHAT_BACKGROUND,
    borderWidth: 0,
    paddingVertical: 12,
  },
});

export default styles;
