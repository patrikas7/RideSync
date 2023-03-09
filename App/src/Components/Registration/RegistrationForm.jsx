import { View } from "react-native";
import PageNames from "../../Constants/pageNames";
import RegistrationNameForm from "./RegistrationNameForm";
import RegistrationPasswordForm from "./RegistrationPasswordForm";
import RegistrationBirthForm from "./RegistrationBirthForm";
import RegistrationStyles from "./RegistrationFormStyles";

const RegistrationForm = ({ pageName, formState, setFormState, errors }) => {
  return (
    <View style={RegistrationStyles.inputsContainer}>
      {pageName === PageNames.REGISTRATION_NAME && (
        <RegistrationNameForm
          formState={formState}
          setFormState={setFormState}
          errors={errors}
        />
      )}
      {pageName === PageNames.REGISTRATION_PASSWORD && (
        <RegistrationPasswordForm
          formState={formState}
          setFormState={setFormState}
          errors={errors}
        />
      )}
      {pageName === PageNames.REGISTRATION_BIRTH && (
        <RegistrationBirthForm
          formState={formState}
          setFormState={setFormState}
          errors={errors}
        />
      )}
    </View>
  );
};

export default RegistrationForm;
