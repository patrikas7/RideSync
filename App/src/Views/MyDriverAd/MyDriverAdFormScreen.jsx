import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { showMessage } from "react-native-flash-message";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import Dropdown from "../../Components/Form/Dropdown";
import Input from "../../Components/Form/Input";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import { constructCarsList } from "../../Utils/utils";
import styles from "./MyDriverAdStyles";

const MyDriverAdFormScreen = ({ token }) => {
  const [formData, setFormData] = useState({
    city: "",
    price: "",
    seats: "",
    car: null,
    description: "",
  });
  const navigation = useNavigation();
  const route = useRoute();
  const userCars = constructCarsList(route.params.userCars);
  useScreenArrowBack(navigation, PageNames.BUSINESS_MY_DRIVER_AD_OVERVIEW);

  console.log(userCars);

  const handleOnPersonsCountChange = (seats) => {
    if (+seats > 4) {
      showMessage({
        message: ErrorMessages.EXCEEDING_PEOPLE_COUNT,
        type: "danger",
        position: "top",
      });

      return;
    }

    setFormData((prevState) => ({ ...prevState, seats }));
  };

  return (
    <Container>
      <View style={styles.container}>
        <Input
          placeholder={"Miestas"}
          icon={"home-outline"}
          value={formData.city}
          onChange={(city) =>
            setFormData((prevState) => ({ ...prevState, city }))
          }
        />

        <Input
          placeholder={"Valandinis tarifas"}
          inputMode={"numeric"}
          icon={"cash-outline"}
          value={formData.price}
          onChange={(price) =>
            setFormData((prevState) => ({ ...prevState, price }))
          }
        />

        <Input
          placeholder={"Keleivių skaičius"}
          inputMode={"numeric"}
          icon={"people-outline"}
          value={formData.seats}
          onChange={handleOnPersonsCountChange}
        />

        <Dropdown
          placeholder={"Automobilis"}
          items={userCars}
          value={formData.car}
          onValueChange={(car) =>
            setFormData((prevState) => ({ ...prevState, car }))
          }
        />

        <Input
          placeholder={"Aprašymas"}
          value={formData.description}
          onChange={(description) =>
            setFormData((prevState) => ({ ...prevState, description }))
          }
          isMultiline={true}
          numberOfLines={8}
          containerStyling={styles.multiline}
        />
      </View>

      <Button text={"Skelbti"} styling={styles.button} />
    </Container>
  );
};

export default MyDriverAdFormScreen;
