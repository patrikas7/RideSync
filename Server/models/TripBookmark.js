import mongoose, { Schema } from "mongoose";
import {
  AvailableSeatsSlots,
  DepartureTimeSlots,
  TripOptions,
} from "../enums/enums.js";

// const TripBookmarkSchema = new Schema({
//   departure: { type: cityType, required: true },
//   destination: { type: cityType, required: true },
//   date: { type: String, required: true },
//   tripOption: { type: String, default: TripOptions.ALL_TRIPS },
//   departureTime: { type: String, default: DepartureTimeSlots.ALL_TIMES },
//   availableSeats: {
//     type: String,
//     default: AvailableSeatsSlots.DOES_NOT_MATTER,
//   },
//   onlyFreeTrips: { type: Boolean, default: false },
//   priceRange: { type: Array },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "BasicUser",
//   },
// });

// const TripBookmark = mongoose.model("TripBookmark", TripBookmarkSchema);

// export default TripBookmark;
