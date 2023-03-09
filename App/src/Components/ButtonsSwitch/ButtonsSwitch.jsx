import PropTypes from "prop-types";
import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import ButtonSwitchStyles from "./ButtonsSwtichStyles";

const ButtonsSwitch = ({ leftButtonText, rightButtonText, onPress }) => {
  const [activeItem, setActiveButton] = useState(0);

  const handleOnPress = (index) => {
    setActiveButton(index);
    if (onPress) onPress(index);
  };

  return (
    <View style={ButtonSwitchStyles.toggleContainer}>
      <TouchableOpacity
        style={[
          ButtonSwitchStyles.toggleItem,
          ButtonSwitchStyles.toggleItemLeft,
          !activeItem && ButtonSwitchStyles.toggleItemActive,
        ]}
        activeOpacity="0.7"
        onPress={() => handleOnPress(0)}
      >
        <Text
          style={[
            ButtonSwitchStyles.toggleText,
            !activeItem && ButtonSwitchStyles.toggleTextActive,
          ]}
        >
          {leftButtonText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          ButtonSwitchStyles.toggleItem,
          ButtonSwitchStyles.toggleItemRight,
          activeItem && ButtonSwitchStyles.toggleItemActive,
        ]}
        activeOpacity="0.7"
        onPress={() => handleOnPress(1)}
      >
        <Text
          style={[
            ButtonSwitchStyles.toggleText,
            activeItem && ButtonSwitchStyles.toggleTextActive,
          ]}
        >
          {rightButtonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

ButtonsSwitch.propTypes = {
  leftButtonText: PropTypes.string.isRequired,
  rightButtonText: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default ButtonsSwitch;
