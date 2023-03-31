import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, View } from "react-native";
import { useState, useRef, useEffect } from "react";
import { ProfileSettingsStyles } from "./ProfileStyles";
import { ButtonColor } from "../../Components/Button/Button";
import { Permissions } from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Form/Header";
import PageNames from "../../Constants/pageNames";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import Sizes from "../../Constants/sizes";
import Button from "../../Components/Button/Button";
import Spinner from "react-native-loading-spinner-overlay/lib";
import axios from "axios";

const ProfilePictureEditScren = ({ token }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasCameraRollPermission, setHasCameraRollPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  useScreenArrowBack(
    navigation,
    PageNames.PROFILE_SETTINGS,
    {
      user,
    },
    "close-outline"
  );

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(
          Permissions.MEDIA_LIBRARY
        );
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasCameraRollPermission(cameraRollPermission.status === "granted");
      } catch (error) {}
    };
    getPermissions();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (hasCameraRollPermission) {
          await MediaLibrary.saveToLibraryAsync(photo.uri);
        }
        setPhoto(photo);
      } catch (error) {}
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const savePicture = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "/user/profilePicture",
        {
          file: selectedImage?.base64,
        },
        { headers: { Authorization: token } }
      );

      console.log(data.user);
      navigation.navigate(PageNames.PROFILE_SETTINGS);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Spinner visible={isLoading} />
      <Header
        text="Atnaujinkite profilio nuotrauką"
        size={Sizes.HEADER_MEDIUM}
      />
      <View style={ProfileSettingsStyles.imageWrapper}>
        <Image
          source={
            selectedImage
              ? { uri: selectedImage.uri }
              : require("../../../assets/pictures/avatar.png")
          }
          style={ProfileSettingsStyles.avatar}
        />
      </View>
      <View style={ProfileSettingsStyles.buttonsContainer}>
        <Button
          text={"Daryti nuotrauką"}
          styling={ProfileSettingsStyles.firstButton}
          color={ButtonColor.WHITE}
          onClick={takePicture}
        />
        <Button
          text={"Pasirinkti nuotrauką"}
          styling={ProfileSettingsStyles.firstButton}
          color={ButtonColor.WHITE}
          onClick={pickImage}
        />

        {selectedImage?.base64 && (
          <Button text={"Išsaugoti"} onClick={savePicture} />
        )}
      </View>
    </Container>
  );
};

export default ProfilePictureEditScren;
