import Input from "../Form/Input";
import RegistrationStyles from "./RegistrationFormStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setName,
  setSurname,
} from "../../redux/registration/registrationSlices";

const RegistrationNameForm = () => {
  const formState = useSelector((state) => state.registration);
  const errors = useSelector((state) => state.registrationErrors);
  const dispatch = useDispatch();

  return (
    <>
      <Input
        placeholder={"Vardas"}
        icon={"person-outline"}
        autoFocus={true}
        value={formState.name}
        onChange={(value) => dispatch(setName(value))}
        hasError={!!errors.name}
        errorText={errors.name}
      />
      <Input
        placeholder={"Pavardė"}
        icon={"person-outline"}
        containerStyling={RegistrationStyles.input}
        value={formState.surname}
        onChange={(value) => dispatch(setSurname(value))}
        hasError={!!errors.surname}
        errorText={errors.surname}
      />
      <Input
        placeholder={"Paštas"}
        icon={"mail-outline"}
        containerStyling={RegistrationStyles.input}
        value={formState.email}
        onChange={(value) => dispatch(setEmail(value))}
        hasError={!!errors.email}
        errorText={errors.email}
      />
    </>
  );
};

export default RegistrationNameForm;
