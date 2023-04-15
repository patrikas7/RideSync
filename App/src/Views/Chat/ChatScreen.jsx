import { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../API/constants";
import { fetchUserChat } from "../../API/userApi";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import Container from "../../Components/Container/Container";
import Spinner from "react-native-loading-spinner-overlay/lib";

const socket = io(SOCKET_URL);

const ChatScreen = ({ navigation, route }) => {
  const { prevScreen, token, receiver } = route.params;
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useScreenArrowBack(navigation, prevScreen, {}, "close-outline");

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
