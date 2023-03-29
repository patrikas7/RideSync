import { View, Image, Text } from "react-native";
import { ProfileScreenStyles } from "./ProfileStyles";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import ListItem from "../../Components/List/ListItem";

const ProfileScreen = ({ navigation }) => {
  useScreenArrowBack(navigation, PageNames.SEARCH);
  return (
    <Container>
      <View style={ProfileScreenStyles.headerContainer}>
        <Image
          source={require("../../../assets/pictures/avatar.png")}
          style={ProfileScreenStyles.avatar}
        />
        <View>
          <Text style={ProfileScreenStyles.welcomeText}>Sveiki</Text>
          <Text style={ProfileScreenStyles.userName}>
            Patrikas Voicechovski
          </Text>
        </View>
      </View>
      <View style={ProfileScreenStyles.optionsList}>
        <ListItem icon={"person-outline"} text={"Profilio detalės"} />
        <ListItem icon={"settings-outline"} text={"Nustatymai"} />
        <ListItem icon={"car-outline"} text={"Pridėti automobilį"} />
      </View>
    </Container>
  );
};

export default ProfileScreen;
