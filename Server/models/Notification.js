import mongoose, { Schema } from "mongoose";
import { NotificationTypes } from "../enums/enums.js";
import Logging from "../library/Logging.js";
import User from "./User.js";

const NotificationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
  },
  notificationType: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

NotificationSchema.pre("save", async function (next) {
  if (!this.isNew) next();
  try {
    const user = await User.findById(this.user);
    user.notifications.push(this._id);
    await user.save();

    if (this.notificationType === NotificationTypes.CHAT_MESSAGE) {
      const sender = await User.findById(this.sender);
      sender.notifications.push(this._id);
      await sender.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
