import { useEffect } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import Colors from "../Constants/colors";
import Sizes from "../Constants/sizes";
import { Ionicons } from "@expo/vector-icons";

const useScreenArrowBack = (
  navigation,
  prevPage,
  props,
  icon = "arrow-back-outline"
) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableHighlight
          onPress={() => navigation.navigate(prevPage, { ...props })}
          underlayColor={Colors.WHITE}
        >
          <Ionicons
            name={icon}
            size={Sizes.ICON}
            color={Colors.GREY_700}
            style={styles.arrowIcon}
          />
        </TouchableHighlight>
      ),
    });
  }, []);
};

const styles = StyleSheet.create({
  arrowIcon: {
    paddingLeft: 25,
  },
});

export default useScreenArrowBack;
