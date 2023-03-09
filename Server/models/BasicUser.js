import mongoose, { Schema } from "mongoose";
import User from "./User.js";
const BasicUserSchema = new Schema({
  departureSearchHistory: [{ type: String }],
  destinationSearchHistory: [{ type: String }],
  tripsSearchHistory: [{ departure: String, destination: String }],
  tripBookmarks: [
    { departure: String, destination: String, personCount: Number },
  ],
});

const BasicUser = User.discriminator("BasicUser", BasicUserSchema);

export default BasicUser;
