import { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../API/constants";
import { fetchUserChats } from "../../API/userApi";
import useScreenArrowBack from "../../hooks/useScreenArrowBack";
import Container from "../../Components/Container/Container";
import Spinner from "react-native-loading-spinner-overlay/lib";

const ChatScreen = ({ navigation, route }) => {
  const { prevScreen, token } = route.params;
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useScreenArrowBack(navigation, prevScreen, {}, "close-outline");

  useEffect(() => {
    if (!token) return;

    const fetchUserChatHistory = async () => {
      setIsLoading(true);
      const { user, messages } = await fetchUserChats(token);
      setUser(user);
      setMessages(messages);
      setIsLoading(false);
    };

    const initializeSocket = async () => {
      const newSocket = io(SOCKET_URL);
      setSocket(newSocket);

      newSocket.on("message", (message) => {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, message)
        );
      });

      return () => {
        newSocket.disconnect();
      };
    };

    const setupAndCleanup = async () => {
      await fetchUserChatHistory();
      const cleanup = await initializeSocket();

      return () => {
        if (cleanup) {
          cleanup();
        }
      };
    };

    const cleanup = setupAndCleanup();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [token]);

  const onSend = (newMessages = []) => {
    if (socket) {
      newMessages.forEach((message) => {
        socket.emit("message", message);
      });
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
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
