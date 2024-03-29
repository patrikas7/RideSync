import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
  text: { type: String, maxlength: 500, required: true },
  createdAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
