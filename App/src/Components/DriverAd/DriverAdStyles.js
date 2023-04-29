import { StyleSheet } from "react-native";
import Sizes from "../../Constants/sizes";
import StyleUtils from "../../Utils/styleUtils";

const styles = StyleSheet.create({
  container: { marginTop: 16, flex: 1 },
  driverAdContainer: { marginTop: 16, ...StyleUtils.card },
  listItem: { paddingVertical: 8 },
  button: {
    marginBottom: 32,
  },
  driverAdProfile: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  chatContainer: { alignItems: "center" },
  chatText: { marginTop: 8, fontSize: Sizes.DEFAULT_TEXT_SIZE },
});

export default styles;
