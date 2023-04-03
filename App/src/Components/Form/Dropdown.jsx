import { getDropdownStyles } from "./FormStyles";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";

const Dropdown = ({ placeholder, items, onValueChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
  );
};

export default Dropdown;
