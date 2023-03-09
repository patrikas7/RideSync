import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import Input from "./Input";

const InputDataPicker = ({
  containerStyling,
  onSelect,
  value,
  hasError,
  errorText,
  placeholder,
  minimumDate,
  maximumDate,
}) => {
  const [isDatePicerVisible, setIsDatePickerVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleDateSelect = (date) => {
    setIsDatePickerVisible(false);
    onSelect(date.toISOString().slice(0, 10));
  };

  const handleOnDatePickerState = (state) => {
    setIsInputFocused(state);
    setIsDatePickerVisible(state);
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        icon={"calendar-outline"}
        showSoftInputOnFocus={false}
        containerStyling={containerStyling}
        value={value}
        focus={isInputFocused}
        onFocus={() => handleOnDatePickerState(true)}
        hasError={hasError}
        errorText={errorText}
      />
      <DateTimePickerModal
        isVisible={isDatePicerVisible}
        mode="date"
        onConfirm={handleDateSelect}
        onCancel={() => handleOnDatePickerState(false)}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </>
  );
};

export default InputDataPicker;
