import { StyleSheet, View } from "react-native";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Sizes.DEFAULT_HORIZONTAL_PADDING,
    flex: 1,
  },
});
