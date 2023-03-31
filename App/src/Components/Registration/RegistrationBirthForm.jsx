import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InputDataPicker from "../Form/InputDatePicker";
import InputRadioButton from "../Form/InputRadioButton";
import RegistrationStyles from "./RegistrationFormStyles";
import { Genders } from "../../Views/Registration/RegistrationUtils";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import {
  setDateOfBirth,
  setGender,
} from "../../redux/registration/registrationSlices";

const RegistrationBirthForm = () => {
  const formState = useSelector((state) => state.registration);
  const errors = useSelector((state) => state.registrationErrors);
  const dispatch = useDispatch();

  return (
    <>
      <InputDataPicker
        value={formState.dateOfBirth}
        onSelect={(value) => dispatch(setDateOfBirth(value))}
        hasError={!!errors.dateOfBirth}
        errorText={errors.dateOfBirth}
        placeholder={"Gimino data"}
        maximumDate={new Date()}
      />

      <View style={RegistrationStyles.input}>
        <View style={RegistrationStyles.genderHeader}>
          <Ionicons
            name="man-outline"
            color={Colors.PLACEHOLDER}
            size={Sizes.ICON}
          />
          <Text style={RegistrationStyles.genderText}>Pasirinkite lytį:</Text>
        </View>
        <View>
          {Genders.map((gender, index) => (
            <InputRadioButton
              key={index}
              value={gender.label}
              isChecked={formState.gender === gender.value}
              onPress={() => dispatch(setGender(gender.value))}
            />
          ))}
        </View>
      </View>
    </>
  );
};

export default RegistrationBirthForm;
