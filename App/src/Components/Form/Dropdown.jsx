import { getDropdownStyles } from "./FormStyles";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text } from "react-native";
import Colors from "../../Constants/colors";

const Dropdown = ({
  placeholder,
  items,
  onValueChange,
  value,
  hasError,
  errorText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <RNPickerSelect
        onValueChange={onValueChange}
        value={value}
        items={items}
        style={getDropdownStyles(isOpen)}
        placeholder={{
          label: placeholder,
          value: null,
          color: "#9EA0A4",
        }}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
      {hasError && (
        <Text style={{ color: Colors.RED, marginTop: 8 }}>{errorText}</Text>
      )}
    </View>
  );
};

export default Dropdown;
