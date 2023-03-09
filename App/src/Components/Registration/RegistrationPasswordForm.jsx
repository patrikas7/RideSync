import Input from "../Form/Input";
import RegistrationStyles from "./RegistrationFormStyles";

const RegistrationPasswordForm = ({ formState, setFormState, errors }) => {
  return (
    <>
      <Input
        placeholder={"Slaptažodis"}
        icon={"lock-closed-outline"}
        containerStyling={RegistrationStyles.input}
        secureTextEntry={true}
        autoFocus={true}
        value={formState.password}
        onChange={(value) =>
          setFormState((currentState) => ({
            ...currentState,
            password: value,
          }))
        }
        hasError={!!errors.password}
        errorText={errors.password}
      />
      <Input
        placeholder={"Pakartokite slaptažodį"}
        icon={"lock-closed-outline"}
        containerStyling={RegistrationStyles.input}
        secureTextEntry={true}
        value={formState.passwordRepeat}
        onChange={(value) =>
          setFormState((currentState) => ({
            ...currentState,
            passwordRepeat: value,
          }))
        }
        hasError={!!errors.passwordRepeat}
        errorText={errors.passwordRepeat}
      />
    </>
  );
};

export default RegistrationPasswordForm;
