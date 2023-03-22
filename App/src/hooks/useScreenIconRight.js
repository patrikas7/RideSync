import { useEffect } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Constants/colors";
import Sizes from "../Constants/sizes";

const useScreenIconRight = ({
  navigation,
  icon,
  onPress,
  shouldRender = true,
  color = Colors.GREY_700,
}) => {
  useEffect(() => {
    if (!shouldRender) return null;
    navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight onPress={onPress} underlayColor={Colors.WHITE}>
          <Ionicons
            name={icon}
            size={Sizes.ICON}
            color={color}
            style={styles.arrowIcon}
          />
        </TouchableHighlight>
      ),
    });
  }, [shouldRender]);
};

const styles = StyleSheet.create({
  arrowIcon: {
    paddingRight: 20,
  },
});

export default useScreenIconRight;
