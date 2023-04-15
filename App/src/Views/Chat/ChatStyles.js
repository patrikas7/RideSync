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
    paddingBottom: 16,
  },
  avatar: {
    ...StyleUtils.avatar,
    width: 35,
    height: 35,
    borderColor: Colors.GREY_600,
    marginLeft: 16,
  },
  headerText: {
    marginLeft: 16,
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    fontWeight: "bold",
  },
});

export default styles;
