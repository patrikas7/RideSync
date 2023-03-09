import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Colors from "../Constants/colors";
import Sizes from "../Constants/sizes";
import { Ionicons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

const useScreenArrowBack = (navigation, prevPage) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableHighlight
          onPress={() => navigation.navigate(prevPage)}
          underlayColor={Colors.WHITE}
        >
          <Ionicons
            name="arrow-back-outline"
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
