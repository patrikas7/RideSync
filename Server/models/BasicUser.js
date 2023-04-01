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
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  tripSubscriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "TripSubscription" },
  ],
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
});

const BasicUser = User.discriminator("BasicUser", BasicUserSchema);

export default BasicUser;
