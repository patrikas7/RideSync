import { useEffect } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Constants/colors";
import Sizes from "../Constants/sizes";

const useScreenIconRight = ({
  navigation,
  icons,
  onPress,
  shouldRender,
  color = Colors.GREY_700,
}) => {
  useEffect(() => {
    if (!shouldRender) return;
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.container}>
          {icons.map((icon, index) => (
            <TouchableHighlight
              onPress={() => onPress(index)}
              underlayColor={Colors.WHITE}
              key={index}
            >
              <Ionicons
                name={icon}
                size={Sizes.ICON}
                color={color}
                style={styles.arrowIcon}
              />
            </TouchableHighlight>
          ))}
        </View>
      ),
    });
  }, [shouldRender]);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowIcon: {
    paddingRight: 20,
  },
});

export default useScreenIconRight;
