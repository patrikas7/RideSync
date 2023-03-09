import mongoose, { Schema } from "mongoose";
import User from "./User.js";
const BasicUserSchema = new Schema({
  departureSearchHistory: [{ type: String }],
  destinationSearchHistory: [{ type: String }],
  tripsSearchHistory: [{ departure: String, destination: String }],
  tripBookmarks: [
    { departure: String, destination: String, personCount: Number },
  ],
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const BasicUser = User.discriminator("BasicUser", BasicUserSchema);

export default BasicUser;
