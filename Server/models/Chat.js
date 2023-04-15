import mongoose, { Schema } from "mongoose";
import User from "./User.js";

const ChatSchema = new Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

ChatSchema.pre("save", async function (next) {
  if (!this.isNew) next();
  try {
    await Promise.all(
      this.users.map(async (id) => {
        const user = await User.findById(id);
        if (user) {
          user.chats.push(this._id);
          await user.save();
        }
      })
    );
    next();
  } catch (error) {
    next(error);
  }
});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
