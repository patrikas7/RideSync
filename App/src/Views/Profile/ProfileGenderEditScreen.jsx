import { Image, View, Text, TouchableHighlight } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { ProfileValueEditScreenStyles } from "./ProfileStyles";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import Sizes from "../../Constants/sizes";
import Button from "../../Components/Button/Button";
import Spinner from "react-native-loading-spinner-overlay";
import Header from "../../Components/Form/Header";
import Colors from "../../Constants/colors";
import axios from "axios";

const Genders = { MALE: "MALE", FEMALE: "FEMALE" };

const ProfileGenderEditScreen = ({ token }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, user } = route.params;
  const [value, setValue] = useState(user.gender);
  const [isLoading, setIsLoading] = useState(false);
  useScreenArrowBack(
    navigation,
    PageNames.PROFILE_DETAILS,
    { user },
    "close-outline"
  );

  const handleOnSavePress = async () => {
    if (value === user.gender) {
      redirectBack(user);
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.put(
        "/user",
        {
          field: "gender",
          value,
        },
        { headers: { Authorization: token } }
      );

      redirectBack(data.user);
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectBack = (userDetails) => {
    navigation.navigate(PageNames.PROFILE_DETAILS, { user: userDetails });
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <View style={ProfileValueEditScreenStyles.container}>
        <Header text={title} size={Sizes.HEADER_MEDIUM} />
        <View style={ProfileValueEditScreenStyles.imagesContainer}>
          <TouchableHighlight
            style={[
              ProfileValueEditScreenStyles.imageCard,
              value === Genders.MALE &&
                ProfileValueEditScreenStyles.imageCardActive,
            ]}
            underlayColor={Colors.HIGHLIGHT_UNDERLAY}
            onPress={() => setValue(Genders.MALE)}
          >
            <View>
              <Image
                source={require("../../../assets/pictures/male-gender.jpeg")}
                style={ProfileValueEditScreenStyles.image}
              />

              <Text style={ProfileValueEditScreenStyles.imageText}>Vyras</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={[
              ProfileValueEditScreenStyles.imageCard,
              ProfileValueEditScreenStyles.imageCardLeft,
              value === Genders.FEMALE &&
                ProfileValueEditScreenStyles.imageCardActive,
            ]}
            underlayColor={Colors.HIGHLIGHT_UNDERLAY}
            onPress={() => setValue(Genders.FEMALE)}
          >
            <View>
              <Image
                source={require("../../../assets/pictures/female-gender.jpeg")}
                style={ProfileValueEditScreenStyles.image}
              />

              <Text style={ProfileValueEditScreenStyles.imageText}>
                Moteris
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <Button
        text={"Išsaugoti"}
        styling={ProfileValueEditScreenStyles.button}
        onClick={handleOnSavePress}
      />
    </Container>
  );
};

export default ProfileGenderEditScreen;
