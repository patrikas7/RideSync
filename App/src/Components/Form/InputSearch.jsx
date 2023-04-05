import { View, TouchableOpacity, Animated, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";
import { InputSearchStyles } from "./FormStyles";
import { useEffect, useRef, useState } from "react";

const InputSearch = ({
  onBack,
  placeholder,
  value,
  onChange,
  styling,
  secureTextEntry,
  multiline,
  onFocus,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputContainer = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(inputContainer, {
      toValue: isFocused ? 2 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const handleOnFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  return (
    <Animated.View
      style={{
        ...InputSearchStyles.inputSearchContainer,
        borderWidth: inputContainer,
        ...styling,
      }}
    >
      {onBack && (
        <TouchableOpacity onPress={onBack}>
          <Ionicons
            name="chevron-back-outline"
            size={Sizes.ICON}
            color={Colors.BLACK_100}
          />
        </TouchableOpacity>
      )}

      <View style={InputSearchStyles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          style={InputSearchStyles.input}
          onFocus={handleOnFocus}
          onBlur={() => setIsFocused(false)}
          maxLength={!multiline ? 30 : undefined}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
        />

        {value && (
          <TouchableOpacity
            onPress={() => onChange("")}
            style={InputSearchStyles.deleteIcon}
          >
            <Ionicons
              name="close-outline"
              size={Sizes.ICON}
              color={Colors.BLACK_100}
            />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

export default InputSearch;
