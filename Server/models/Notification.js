import mongoose, { Schema } from "mongoose";
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
  try {
    const user = await User.findById(this.user);
    user.notifications.push(this._id);
    await user.save();

    next();
  } catch (error) {
    next(error);
  }
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
