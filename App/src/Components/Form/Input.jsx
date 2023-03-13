import { View, TextInput, Text } from "react-native";
import Colors from "../../Constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Sizes from "../../Constants/sizes";
import { InputStyles } from "./FormStyles";
import { useState } from "react";

const Input = ({
  placeholder,
  icon,
  secureTextEntry,
  containerStyling,
  value,
  onChange,
  autoFocus,
  hasError,
  errorText,
  onFocus,
  onBlur,
  focus,
  isMultiline,
  inputMode = "text",
  color = Colors.GREY,
  showSoftInputOnFocus = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleOnBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <View style={[containerStyling]}>
      <View style={InputStyles.inputContainer}>
        {icon && (
          <Ionicons
            name={icon}
            color={isFocused ? Colors.BLUE_500 : color}
            size={Sizes.ICON}
          />
        )}
        <TextInput
          placeholder={placeholder}
          style={[
            InputStyles.input,
            { borderBottomColor: isFocused ? Colors.BLUE_500 : color },
            hasError && InputStyles.inputError,
            isMultiline && InputStyles.multiLineInput,
          ]}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          focus={focus}
          autoFocus={autoFocus}
          showSoftInputOnFocus={showSoftInputOnFocus}
          inputMode={inputMode}
          keyboardType={inputMode}
          multiline={isMultiline}
          maxLength={isMultiline ? 1000 : 255}
        />
      </View>
      <View style={InputStyles.errorContainer}>
        {hasError && <Text style={InputStyles.errorText}>{errorText}</Text>}
      </View>
    </View>
  );
};

export default Input;
