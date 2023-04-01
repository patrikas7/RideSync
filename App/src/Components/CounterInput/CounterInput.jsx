import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import CounterInputStyles from "./CounterInputStyles";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const Buttons = {
  PLUS: "PLUS",
  MINUS: "MINUS",
};

const CounterInput = ({ initialValue, onChange, valueRange }) => {
  const [value, setValue] = useState(initialValue);
  const [activeButton, setActiveButton] = useState(Buttons.PLUS);

  const handleOnPress = (newValue) => {
    setActiveButton(newValue > value ? Buttons.PLUS : Buttons.MINUS);
    if (newValue > valueRange[1] || newValue < valueRange[0]) return;
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <View style={CounterInputStyles.counterInput}>
      <TouchableOpacity
        style={[
          CounterInputStyles.button,
          activeButton === Buttons.MINUS && CounterInputStyles.activeButton,
          activeButton === Buttons.MINUS &&
            value - 1 < valueRange[0] &&
            CounterInputStyles.disabledButton,
        ]}
        onPress={() => handleOnPress(value - 1)}
        activeOpacity={0.8}
      >
        <Ionicons
          name="remove"
          color={activeButton === Buttons.MINUS ? Colors.WHITE : Colors.BLACK}
          size={Sizes.ICON_LARGE}
        />
      </TouchableOpacity>
      <Text style={CounterInputStyles.value}>{value}</Text>
      <TouchableOpacity
        style={[
          CounterInputStyles.button,
          activeButton === Buttons.PLUS && CounterInputStyles.activeButton,
          activeButton === Buttons.PLUS &&
            value + 1 > valueRange[1] &&
            CounterInputStyles.disabledButton,
        ]}
        onPress={() => handleOnPress(value + 1)}
        activeOpacity={0.8}
      >
        <Ionicons
          name="add"
          color={activeButton === Buttons.PLUS ? Colors.WHITE : Colors.BLACK}
          size={Sizes.ICON_LARGE}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CounterInput;
