import { StyleSheet, View, Text } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";

const RadioButtons = ({ labels, values, selected, onSelect }) => {
  return (
    <RadioButtonGroup
      selected={selected}
      onSelected={(value) => onSelect(value)}
      radioBackground={Colors.BLUE_500}
      size={20}
      radioStyle={styles.radioButton}
    >
      {values.map((value, index) => (
        <RadioButtonItem
          value={value}
          label={<Text style={styles.radioButtonText}>{labels[index]}</Text>}
          key={index}
          style={selected === value ? styles.radioButtonActive : {}}
        />
      ))}
    </RadioButtonGroup>
  );
};

export default RadioButtons;

const styles = StyleSheet.create({
  radioButtonActive: {
    borderColor: Colors.BLUE_500,
  },
  radioButton: {
    marginTop: 8,
    marginRight: 4,
  },
  radioButtonText: {
    fontSize: Sizes.DEFAULT_TEXT_SIZE,
    marginTop: 8,
  },
});
