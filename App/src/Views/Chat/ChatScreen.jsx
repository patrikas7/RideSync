import { useState, useEffect } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { io } from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import { SOCKET_URL } from "../../API/constants";
import { fetchUserChat } from "../../API/userApi";
import Container from "../../Components/Container/Container";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Sizes from "../../Constants/sizes";
import Colors from "../../Constants/colors";
import styles from "./ChatStyles";

const socket = io(SOCKET_URL);

const ChatScreen = ({ navigation, route }) => {
  const { prevScreen, token, receiver, profilePictureUri, receiverName } =
    route.params;
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchUserChatHistory = async () => {
      setIsLoading(true);
      const { chat, user } = await fetchUserChat(token, receiver);
      setUser(user);
      setChat(chat);
      setMessages(chat.messages);
      setIsLoading(false);
    };

    fetchUserChatHistory();
  }, [token]);

  useEffect(() => {
    if (!chat) return;
    socket.emit("joinChat", chat._id);

    socket.on("message", (newMessage) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage)
      );
    });

    return () => {
      socket.off("message");
    };
  }, [chat]);

  const onSend = (newMessages = []) => {
    const message = newMessages[0];
    socket.emit("message", { chatId: chat._id, message });
  };

  return (
    <Container>
      <View style={styles.chatHeader}>
        <TouchableOpacity
          onPress={() => navigation.navigate(prevScreen, route.params)}
        >
          <Ionicons
            name="close-outline"
            size={Sizes.ICON}
            color={Colors.GREY_700}
          />
        </TouchableOpacity>
        <Image
          source={
            profilePictureUri
              ? { uri: profilePictureUri }
              : require("../../../assets/pictures/avatar.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.headerText}>{receiverName}</Text>
      </View>
      {isLoading || !user ? (
        <Spinner visible={isLoading} />
      ) : (
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: user.id,
            name: user.name,
          }}
        />
      )}
    </Container>
  );
};

export default ChatScreen;
