import { View, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import { ProfileScreenStyles } from "./ProfileStyles";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import ListItem from "../../Components/List/ListItem";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = ({ token }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  useScreenArrowBack(navigation, PageNames.SEARCH);

  useEffect(() => {
    if (!token) return;
    fetchUserDetails();
  }, [token]);

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get("/user", {
        headers: { Authorization: token },
      });

      setUser(data.user);
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <>
          <View style={ProfileScreenStyles.headerContainer}>
            <Image
              source={require("../../../assets/pictures/avatar.png")}
              style={ProfileScreenStyles.avatar}
            />
            <View>
              <Text style={ProfileScreenStyles.welcomeText}>Sveiki</Text>
              <Text style={ProfileScreenStyles.userName}>
                {`${user.name} ${user.surname}`}
              </Text>
            </View>
          </View>
          <View style={ProfileScreenStyles.optionsList}>
            <ListItem icon={"person-outline"} text={"Profilio detalės"} />
            <ListItem icon={"settings-outline"} text={"Nustatymai"} />
            <ListItem icon={"car-outline"} text={"Pridėti automobilį"} />
          </View>
        </>
      )}
    </Container>
  );
};

export default ProfileScreen;
