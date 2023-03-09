import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../../Constants/colors";

export const ButtonColor = {
  BLUE: "BLUE",
  WHITE: "WHITE",
};

const Button = ({ text, onClick, styling, color = ButtonColor.BLUE }) => {
  const buttonContainerColor =
    color === ButtonColor.BLUE
      ? styles.buttonInnerContainerBlue
      : styles.buttonInnerContainerGrey;

  return (
    <View style={{ ...styles.buttonOuterContainer, ...styling }}>
      <Pressable
        onPress={onClick}
        style={({ pressed }) =>
          pressed
            ? [
                styles.pressed,
                styles.buttonInnerContainer,
                buttonContainerColor,
              ]
            : [styles.buttonInnerContainer, buttonContainerColor]
        }
      >
        <Text
          style={[
            styles.buttonText,
            color === ButtonColor.BLUE
              ? styles.buttonTextColorBlue
              : styles.buttonTextColorGrey,
          ]}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 12,
    marginHorizontal: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    paddingVertical: 12,
  },
  buttonInnerContainerBlue: { backgroundColor: Colors.BLUE_500 },
  buttonInnerContainerGrey: { backgroundColor: Colors.GREY_400 },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextColorBlue: { color: Colors.WHITE },
  buttonTextColorGrey: { color: Colors.GREY_600 },
  pressed: {
    opacity: 0.75,
  },
});
