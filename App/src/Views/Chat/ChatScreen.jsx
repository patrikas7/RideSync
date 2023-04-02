import { Image, View, Text, TouchableOpacity } from "react-native";
import PageNames from "../../Constants/pageNames";
import Container from "../../Components/Container/Container";
import styles from "./ChatStyles";
import { Ionicons } from "@expo/vector-icons";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";
import InputSearch from "../../Components/Form/InputSearch";
import { useState } from "react";

const ChatScreen = ({ navigation, route }) => {
  const [messsage, setMessage] = useState("");

  return (
    <Container>
      <View style={styles.chatHeader}>
        <Image
          source={require("../../../assets/pictures/avatar.png")}
          style={styles.avatar}
        />
        <Text style={styles.headerText}>Patrikas Voicechovski</Text>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() =>
            navigation.navigate(PageNames.TRIP_INFORMATION, { ...route.params })
          }
          activeOpacity={0.6}
        >
          <Ionicons
            name="close-outline"
            size={Sizes.ICON_LARGE}
            color={Colors.GREY_600}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.chatContainer}></View>
      <InputSearch
        placeholder={"Rašyti žinutę..."}
        styling={styles.inputContainer}
        value={messsage}
        onChange={setMessage}
        multiline={true}
      />
    </Container>
  );
};

export default ChatScreen;
