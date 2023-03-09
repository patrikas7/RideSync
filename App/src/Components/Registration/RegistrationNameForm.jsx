import Input from "../Form/Input";
import RegistrationStyles from "./RegistrationFormStyles";

const RegistrationNameForm = ({ formState, setFormState, errors }) => {
  return (
    <>
      <Input
        placeholder={"Vardas"}
        icon={"person-outline"}
        autoFocus={true}
        value={formState.name}
        onChange={(value) =>
          setFormState((currentState) => ({ ...currentState, name: value }))
        }
        hasError={!!errors.name}
        errorText={errors.name}
      />
      <Input
        placeholder={"Pavardė"}
        icon={"person-outline"}
        containerStyling={RegistrationStyles.input}
        value={formState.lastname}
        onChange={(value) =>
          setFormState((currentState) => ({
            ...currentState,
            lastname: value,
          }))
        }
        hasError={!!errors.lastname}
        errorText={errors.lastname}
      />
      <Input
        placeholder={"Paštas"}
        icon={"mail-outline"}
        containerStyling={RegistrationStyles.input}
        value={formState.email}
        onChange={(value) =>
          setFormState((currentState) => ({
            ...currentState,
            email: value,
          }))
        }
        hasError={!!errors.email}
        errorText={errors.email}
      />
    </>
  );
};

export default RegistrationNameForm;
