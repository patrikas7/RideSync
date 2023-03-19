import { View, Text, Pressable } from "react-native";
import { ButtonStyles } from "./ButtonStyles";

export const ButtonColor = {
  BLUE: "BLUE",
  WHITE: "WHITE",
};

const Button = ({ text, onClick, styling, color = ButtonColor.BLUE }) => {
  const buttonContainerColor =
    color === ButtonColor.BLUE
      ? ButtonStyles.buttonInnerContainerBlue
      : ButtonStyles.buttonInnerContainerGrey;

  return (
    <View style={{ ...ButtonStyles.buttonOuterContainer, ...styling }}>
      <Pressable
        onPress={onClick}
        style={({ pressed }) =>
          pressed
            ? [
                ButtonStyles.pressed,
                ButtonStyles.buttonInnerContainer,
                buttonContainerColor,
              ]
            : [ButtonStyles.buttonInnerContainer, buttonContainerColor]
        }
      >
        <Text
          style={[
            ButtonStyles.buttonText,
            color === ButtonColor.BLUE
              ? ButtonStyles.buttonTextColorBlue
              : ButtonStyles.buttonTextColorGrey,
          ]}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;
