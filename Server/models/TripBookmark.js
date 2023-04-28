import mongoose, { Schema } from "mongoose";
import {
  AvailableSeatsSlots,
  DepartureTimeSlots,
  TripOptions,
} from "../enums/enums.js";
import BasicUser from "./BasicUser.js";

const TripBookmarkSchema = new Schema({
  departure: { type: String, maxlength: 50, required: true },
  destination: { type: String, maxlength: 50, required: true },
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
  } catch (error) {
    next(error);
  }
});

TripBookmarkSchema.pre("delete", async function (next) {
  try {
    const user = await BasicUser.findById(this.userId);
    user.tripBookmarks.pull(this._id);
    await user.save();

    next();
  } catch (error) {
    next(error);
  }
});

const TripBookmark = mongoose.model("TripBookmark", TripBookmarkSchema);

export default TripBookmark;
