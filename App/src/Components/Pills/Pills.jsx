import { View } from "react-native";
import Pill from "./Pill";
import PillsStyles from "./PillsStyles";

const Pills = ({ pills, onPress, children }) => {
  return (
    <View style={PillsStyles.pillsContainer}>
      {children}
      {pills?.map((text, index) => (
        <Pill key={index} text={text} onPress={() => onPress(text)} />
      ))}
    </View>
  );
};

export default Pills;
