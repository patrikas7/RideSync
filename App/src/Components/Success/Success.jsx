import { View, Image, Text } from "react-native";
import Button from "../Button/Button";
import SuccessStyle from "./SuccessStyle";

const Success = ({ primaryText, secondaryText, buttonText, onPress }) => {
  return (
    <View style={SuccessStyle.container}>
      <View style={SuccessStyle.content}>
        <Image
          source={require("../../../assets/pictures/success.gif")}
          style={SuccessStyle.image}
        />
        <View>
          <Text style={SuccessStyle.primaryText}>{primaryText}</Text>
          <Text style={SuccessStyle.secondaryText}>{secondaryText}</Text>
        </View>
      </View>

      <Button
        text={buttonText}
        styling={SuccessStyle.button}
        onClick={onPress}
      />
    </View>
  );
};

export default Success;
