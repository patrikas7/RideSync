import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Genders } from "../../Views/Registration/RegistrationUtils";
import {
  setDateOfBirth,
  setGender,
  toggleRegistrationType,
} from "../../redux/registration/registrationSlices";
import InputDataPicker from "../Form/InputDatePicker";
import InputRadioButton from "../Form/InputRadioButton";
import RegistrationStyles from "./RegistrationFormStyles";
import Colors from "../../Constants/colors";
import Sizes from "../../Constants/sizes";
import Checkbox from "expo-checkbox";

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

      <View style={RegistrationStyles.checkboxInput}>
        <Checkbox
          value={formState.isBussinessRegistration}
          onValueChange={() => dispatch(toggleRegistrationType())}
          color={
            formState.isBussinessRegistration ? Colors.BLUE_500 : undefined
          }
        />
        <Text style={RegistrationStyles.checkboxLabel}>
          Verslo kliento registracija
        </Text>
      </View>
    </>
  );
};

export default RegistrationBirthForm;
