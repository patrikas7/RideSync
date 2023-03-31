import mongoose, { Schema } from "mongoose";
import { Genders } from "../enums/enums.js";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String },
  gender: {
    type: String,
    enum: [Genders.MALE, Genders.FEMALE],
    required: true,
  },
  profilePicture: {
    buffer: { type: Buffer },
    type: { type: String },
  },
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
