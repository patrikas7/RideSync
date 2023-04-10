import mongoose, { Schema } from "mongoose";

export const cityType = {
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: true },
  city: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
};

const TripSchema = new Schema({
  departure: { type: cityType, required: true },
  destination: { type: cityType, required: true },
  stops: [{ type: cityType }],
  date: { type: String, required: true },
  time: { type: String, required: true },
  personsCount: { type: Number, required: true },
  price: { type: String, required: true },
  comments: { type: String },
  isTripFree: { type: Boolean, required: true },
  isRoundTrip: { type: Boolean, required: true },
  returnDate: { type: String },
  returnTime: { type: String },
  driver: { type: Schema.Types.ObjectId, ref: "BasicUser" },
  car: { type: Schema.Types.ObjectId, ref: "Car" },
  passengers: [
    {
      passenger: { type: Schema.Types.ObjectId, ref: "BasicUser" },
      seatsBooked: { type: Number },
    },
  ],
});

const Trip = mongoose.model("Trip", TripSchema);

export default Trip;
