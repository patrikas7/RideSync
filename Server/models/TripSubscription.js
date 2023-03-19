import mongoose, { Schema } from "mongoose";

const TripSubscriptionSchema = new Schema({
  departureCity: { type: String, required: true },
  destinationCity: { type: String, required: true },
  date: { type: String, required: true },
  personsCount: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "BasicUser" },
});

const TripSubscription = mongoose.model(
  "TripSubscription",
  TripSubscriptionSchema
);

export default TripSubscription;
