import { View } from "react-native";
import PublishInformationFormStyles from "./PublishInformationFormStyles";
import InputDatePicker from "../Form/InputDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../redux/publish/publishSlice";
import Input from "../Form/Input";

const PublishInformationForm = () => {
  const state = useSelector((state) => state.publish);
  const dispatch = useDispatch();

  return (
    <View style={PublishInformationFormStyles.formContainer}>
      <Input
        placeholder={"Keleivių skaičius"}
        icon={"people-outline"}
        inputMode={"numeric"}
      />
    </View>
  );
};

export default PublishInformationForm;
