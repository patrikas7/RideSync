import Input from "../Form/Input";
import RegistrationStyles from "./RegistrationFormStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  setPassword,
  setPasswordRepeat,
} from "../../redux/registration/registrationSlices";

const RegistrationPasswordForm = () => {
  const formState = useSelector((state) => state.registration);
  const errors = useSelector((state) => state.registrationErrors);
  const dispatch = useDispatch();

  return (
    <>
      <Input
        placeholder={"Slaptažodis"}
        icon={"lock-closed-outline"}
        containerStyling={RegistrationStyles.input}
        secureTextEntry={true}
        autoFocus={true}
        value={formState.password}
        onChange={(value) => dispatch(setPassword(value))}
        hasError={!!errors.password}
        errorText={errors.password}
      />
      <Input
        placeholder={"Pakartokite slaptažodį"}
        icon={"lock-closed-outline"}
        containerStyling={RegistrationStyles.input}
        secureTextEntry={true}
        value={formState.passwordRepeat}
        onChange={(value) => dispatch(setPasswordRepeat(value))}
        hasError={!!errors.passwordRepeat}
        errorText={errors.passwordRepeat}
      />
    </>
  );
};

export default RegistrationPasswordForm;
