import { View, Switch, Text } from "react-native";
import Colors from "../../Constants/colors";
import { InputSwitchStyles } from "./FormStyles";

const InputSwitch = ({ isEnabled, onChange, styling, text }) => {
  return (
    <View style={[InputSwitchStyles.switchContainer, styling]}>
      <Text style={InputSwitchStyles.text}>{text}</Text>
      <Switch
        value={isEnabled}
        onValueChange={onChange}
        thumbColor={isEnabled ? Colors.BLUE_500 : Colors.WHITE}
        trackColor={{ false: Colors.WHITE, true: Colors.BLUE_500_TRANSPARENT }}
      />
    </View>
  );
};

export default InputSwitch;
