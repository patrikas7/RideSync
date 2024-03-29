import mongoose, { Schema } from "mongoose";
import { Genders } from "../enums/enums.js";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  name: { type: String, maxlength: 50, required: true },
  surname: { type: String, maxlength: 50, required: true },
  password: { type: String, maxlength: 100, required: true },
  email: { type: String, maxlength: 100, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, maxlength: 20 },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  gender: {
    type: String,
    enum: [Genders.MALE, Genders.FEMALE],
    required: true,
  },
  profilePicture: {
    buffer: { type: Buffer },
    type: { type: String },
  },
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  ],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

export default User;
