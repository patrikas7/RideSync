import { StyleSheet, View, Text } from "react-native";
import Colors from "../../Constants/colors";
import Input from "../Form/Input";

const LoginForm = ({ formState, setFormState, errors }) => {
  return (
    <View style={styles.inputsContainer}>
      <Input
        placeholder={"Paštas"}
        icon={"at-outline"}
        value={formState.email}
        onChange={(value) =>
          setFormState((currentState) => ({ ...currentState, email: value }))
        }
        hasError={!!errors.email}
        errorText={errors.email}
        inputMode="email"
      />
      <Input
        placeholder={"Slaptažodis"}
        icon={"lock-closed-outline"}
        secureTextEntry={true}
        containerStyling={styles.passwordContainer}
        value={formState.password}
        onChange={(value) =>
          setFormState((currentState) => ({ ...currentState, password: value }))
        }
        hasError={!!errors.password}
        errorText={errors.password}
      />
      <View style={styles.passwordReminderContainer}>
        <Text style={styles.passwordReminderText}>Pamiršote slaptažodį?</Text>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputsContainer: {
    marginTop: 24,
  },
  passwordContainer: {
    marginTop: 16,
  },
  passwordReminderContainer: {
    paddingVertical: 16,
  },
  passwordReminderText: {
    alignSelf: "flex-end",
    color: Colors.BLUE_400,
  },
});
