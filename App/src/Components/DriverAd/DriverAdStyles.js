import { StyleSheet } from "react-native";
import StyleUtils from "../../Utils/styleUtils";

const styles = StyleSheet.create({
  container: { marginTop: 32, flex: 1 },
  driverAdContainer: { marginTop: 16, ...StyleUtils.card },
  listItem: { paddingVertical: 8 },
  button: {
    marginBottom: 32,
  },
});

export default styles;
