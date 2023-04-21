import { View } from "react-native";
import Container from "../../Components/Container/Container";
import Success from "../../Components/Success/Success";
import PageNames from "../../Constants/pageNames";

const MyDriverAdSuccessScreen = ({ navigation }) => {
  return (
    <Container>
      <Success
        primaryText={"Vairuotojo skelbimas buvo sukurtas"}
        secondaryText={
          "Savo vairuotojo skelbimą galite peržiūrėti mano skelbimų srityje"
        }
        buttonText={"Mano skelbimas"}
        onPress={() =>
          navigation.navigate(PageNames.BUSINESS_MY_DRIVER_AD_OVERVIEW)
        }
      />
    </Container>
  );
};

export default MyDriverAdSuccessScreen;
