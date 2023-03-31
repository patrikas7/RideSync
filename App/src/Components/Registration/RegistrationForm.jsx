import { View } from "react-native";
import PageNames from "../../Constants/pageNames";
import RegistrationNameForm from "./RegistrationNameForm";
import RegistrationPasswordForm from "./RegistrationPasswordForm";
import RegistrationBirthForm from "./RegistrationBirthForm";
import RegistrationStyles from "./RegistrationFormStyles";

const RegistrationForm = ({ pageName }) => {
  return (
    <View style={RegistrationStyles.inputsContainer}>
      {pageName === PageNames.REGISTRATION_NAME && <RegistrationNameForm />}
      {pageName === PageNames.REGISTRATION_PASSWORD && (
        <RegistrationPasswordForm />
      )}
      {pageName === PageNames.REGISTRATION_BIRTH && <RegistrationBirthForm />}
    </View>
  );
};

export default RegistrationForm;
