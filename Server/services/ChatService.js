import { NotificationTypes } from "../enums/enums.js";
import Logging from "../library/Logging.js";
import Notification from "../models/Notification.js";

const chatService = (io) => {
  io.on("connection", (socket) => {
    Logging.info("User connected:", socket.id);

    socket.on("message", async (data) => {
      const newMessage = new Notification({
        ...data,
        notificationType: NotificationTypes.CHAT_MESSAGE,
      });
      await newMessage.save();
      io.emit("message", newMessage);
    });

    socket.on("disconnect", () => {
      Logging.info("User disconnected:", socket.id);
    });
  });
};

export default chatService;
