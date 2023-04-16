import { View, Text, Pressable } from "react-native";
import { ButtonStyles } from "./ButtonStyles";

export const ButtonColor = {
  BLUE: "Blue",
  WHITE: "Grey",
};

const Button = ({
  text,
  onClick,
  styling,
  disabled,
  color = ButtonColor.BLUE,
}) => {
  const buttonContainerColor = ButtonStyles[`buttonInnerContainer${color}`];
  return (
    <View style={{ ...ButtonStyles.buttonOuterContainer, ...styling }}>
      <Pressable
        onPress={onClick}
        style={({ pressed }) => [
          ButtonStyles.buttonInnerContainer,
          buttonContainerColor,
          pressed ? ButtonStyles.pressed : {},
          disabled ? ButtonStyles.disabledButton : {},
        ]}
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
