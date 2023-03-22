import { View, Text, Pressable } from "react-native";
import { ButtonStyles } from "./ButtonStyles";

export const ButtonColor = {
  BLUE: "Blue",
  WHITE: "Grey",
};

const Button = ({ text, onClick, styling, color = ButtonColor.BLUE }) => {
  const buttonContainerColor = ButtonStyles[`buttonInnerContainer${color}`];

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
            ButtonStyles[`buttonTextColor${color}`],
          ]}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;
