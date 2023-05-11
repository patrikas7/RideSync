import Chat from "../models/Chat.js";
import User from "../models/User.js";
import Message from "../models/Message.js";

export const chatService = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinChat", async (chatId) => {
      socket.join(chatId);
    });

    socket.on("message", async ({ chatId, message }) => {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        throw new Error("Chat not found");
      }

      const newMessage = new Message({
        text: message.text,
        user: message.user,
        createdAt: message.createdAt,
      });

      chat.messages.push(newMessage);
      await chat.save();
      await newMessage.save();

      io.to(chatId).emit("message", {
        ...newMessage.toObject(),
        user: { _id: newMessage.user._id },
      });
    });

    socket.on("disconnect", () => {
      // Logging.info("User disconnected:", socket.id);
    });
  });
};

export const initChat = async (users) => {
  const existingChat = await findChat(users);
  if (!existingChat) {
    const chat = new Chat({ users });
    await chat.save();

    return chat;
  }

  return existingChat;
};

const findChat = async (usersIds) => {
  const users = await fetchUsersChats(usersIds);
  const firstUserChats = users[0].chats;
  let foundChat = null;

  for (let i = 0; i < firstUserChats.length; i++) {
    const chatId = firstUserChats[i];

    let allUsersHaveChat = true;

    for (let j = 1; j < users.length; j++) {
      const userChats = users[j].chats;

      let userHasChat = false;

      for (let k = 0; k < userChats.length; k++) {
        if (chatId.equals(userChats[k])) {
          userHasChat = true;
          break;
        }
      }

      if (!userHasChat) {
        allUsersHaveChat = false;
        break;
      }
    }

    if (allUsersHaveChat) {
      foundChat = await Chat.findById(chatId)
        .populate({
          path: "messages",
          populate: {
            path: "user",
            select: "_id",
          },
        })
        .select("-__v")
        .lean();
      break;
    }
  }

  if (foundChat) foundChat.messages.reverse();

  return foundChat;
};

const fetchUsersChats = async (usersIds) => {
  const users = [];
  await Promise.all(
    usersIds.map(async (id) => {
      const user = await User.findById(id).select("chats");
      users.push(user);
    })
  );

  return users;
};
