import mongoose, { Schema } from "mongoose";
import Logging from "../library/Logging.js";
import BasicUser from "./BasicUser.js";
import { cityType } from "./Trip.js";

const TripSearchRequestSchema = new Schema({
  departure: { type: cityType, required: true },
  destination: { type: cityType, required: true },
  date: { type: String, maxlength: 10, required: true },
  time: { type: String, maxlength: 5, required: true },
  passengersCount: { type: Number, required: true },
  comments: { type: String, maxlength: 255 },
  user: { type: Schema.Types.ObjectId, ref: "BasicUser" },
});

TripSearchRequestSchema.pre("save", async function (next) {
  try {
    const user = await BasicUser.findById(this.user);
    user.tripSearchRequests.push(this._id);
    await user.save();

    next();
  } catch (error) {
    next(error);
  }
});

TripSearchRequestSchema.pre("delete", async function (next) {
  try {
    const user = await BasicUser.findById(this.user);
    user.tripSearchRequests.pull(this._id);
    await user.save();

    next();
  } catch (error) {
    next(error);
  }
});

const TripSearchRequest = mongoose.model(
  "TripSearchRequest",
  TripSearchRequestSchema
);

export default TripSearchRequest;
