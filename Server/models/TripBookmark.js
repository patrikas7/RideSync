import mongoose, { Schema } from "mongoose";
import {
  AvailableSeatsSlots,
  DepartureTimeSlots,
  TripOptions,
} from "../enums/enums.js";
import BasicUser from "./BasicUser.js";

const TripBookmarkSchema = new Schema({
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  tripOption: { type: String, default: TripOptions.ALL_TRIPS },
  departureTime: { type: String, default: DepartureTimeSlots.ALL_TIMES },
  availableSeats: {
    type: String,
    default: AvailableSeatsSlots.DOES_NOT_MATTER,
  },
  onlyFreeTrips: { type: Boolean, default: false },
  priceRange: { type: Array },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "BasicUser",
  },
});

TripBookmarkSchema.pre("save", async function (next) {
  try {
    const user = await BasicUser.findById(this.userId);
    user.tripBookmarks.push(this._id);
    await user.save();
    next();
  } catch (err) {
    next(err);
  }
});

const TripBookmark = mongoose.model("TripBookmark", TripBookmarkSchema);

export default TripBookmark;
