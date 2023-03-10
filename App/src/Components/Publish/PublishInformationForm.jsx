import { View } from "react-native";
import PublishInformationFormStyles from "./PublishInformationFormStyles";
import InputDatePicker from "../Form/InputDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../redux/publish/publishSlice";

const PublishInformationForm = () => {
  const state = useSelector((state) => state.publish);
  const dispatch = useDispatch();

  return (
    <View style={PublishInformationFormStyles.formContainer}>
      <InputDatePicker
        placeholder="Kelionės data"
        minimumDate={new Date()}
        value={state.date}
        onSelect={(date) => dispatch(setDate(date))}
      />
    </View>
  );
};

export default PublishInformationForm;
