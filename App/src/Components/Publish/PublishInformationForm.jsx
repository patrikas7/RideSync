import { View } from "react-native";
import PublishInformationFormStyles from "./PublishInformationFormStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  setComments,
  setPersonsCount,
  toggleIsRoundTrip,
  toggleIsTripFree,
} from "../../redux/publish/publishSlice";
import Input from "../Form/Input";
import Button from "../Button/Button";
import InputSwitch from "../Form/InputSwitch";

const PublishInformationForm = () => {
  const state = useSelector((state) => state.publish);
  const dispatch = useDispatch();

  return (
    <View style={PublishInformationFormStyles.formContainer}>
      <View style={PublishInformationFormStyles.fieldsContainer}>
        <Input
          placeholder={"Keleivių skaičius"}
          icon={"people-outline"}
          inputMode={"numeric"}
          value={state.personsCount}
          onChange={(value) => dispatch(setPersonsCount(value))}
        />

        <Input
          placeholder={"Kaina"}
          icon={"cash-outline"}
          inputMode={"numeric"}
          value={state.price}
          onChange={(value) => dispatch(setPrice(value))}
        />

        <Input
          placeholder={"Papildomi komentarai"}
          value={state.comments}
          onChange={(value) => dispatch(setComments(value))}
          isMultiline={true}
          numberOfLines={4}
          containerStyling={PublishInformationFormStyles.multiline}
        />

        <InputSwitch
          isEnabled={state.isTripFree}
          onChange={() => dispatch(toggleIsTripFree())}
          text="Ar kelionė yra nemokama?"
        />
        <InputSwitch
          isEnabled={state.isRoundTrip}
          onChange={() => dispatch(toggleIsRoundTrip())}
          text="Ar bus grįžtama tuo pačiu maršrutu?"
        />
      </View>
      <Button text="Toliau" styling={PublishInformationFormStyles.button} />
    </View>
  );
};

export default PublishInformationForm;
