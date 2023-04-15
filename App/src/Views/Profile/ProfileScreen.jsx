import { View, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import { ProfileScreenStyles } from "./ProfileStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "../../Components/Container/Container";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import ListItem from "../../Components/List/ListItem";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";

const ProfileScreen = ({ token }) => {
  const route = useRoute();
  const [user, setUser] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  useScreenArrowBack(navigation, PageNames.SEARCH);

  useEffect(() => {
    if (!token) return;
    fetchUserDetails();
  }, [token]);

  useEffect(() => {
    if (!route.params?.user) return;
    if (route.params.user.profilePicture)
      setProfilePicture(route.params.user.profilePicture);
    setUser(route.params.user);
  }, [route.params]);

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get("/user", {
        headers: { Authorization: token },
      });

      console.log(data.user);
      setUser(data.user);
      if (data.user.profilePicture)
        setProfilePicture(
          `data:${data.user.profilePicture.type};base64,${data.user.profilePicture.buffer}`
        );
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnListItemPess = (screen) => {
    navigation.navigate(screen, { user: { ...user, profilePicture: "" } });
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <View style={ProfileScreenStyles.headerContainer}>
            <Image
              source={
                profilePicture
                  ? {
                      uri: profilePicture,
                    }
                  : require("../../../assets/pictures/avatar.png")
              }
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
            <ListItem
              icon={"person-outline"}
              text={"Profilio detalės"}
              onPress={() => handleOnListItemPess(PageNames.PROFILE_DETAILS)}
            />
            <ListItem
              icon={"settings-outline"}
              text={"Nustatymai"}
              onPress={() => handleOnListItemPess(PageNames.PROFILE_SETTINGS)}
            />
            <ListItem
              icon={"car-outline"}
              text={"Mano automobiliai"}
              onPress={() => handleOnListItemPess(PageNames.PROFILE_VEHICLE)}
            />
          </View>
        </>
      )}
    </Container>
  );
};

export default ProfileScreen;
