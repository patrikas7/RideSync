import mongoose, { Schema } from "mongoose";
import Logging from "../library/Logging.js";
import BasicUser from "./BasicUser.js";

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

TripSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const user = await BasicUser.findById(this.driver);
      user.trips.push(this._id);
      await user.save();

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

TripSchema.pre("delete", async function (next) {
  try {
    const user = await BasicUser.findById(this.driver);
    user.trips.pull(this._id);
    await user.save();

    await Promise.all(
      this.passengers.map(async (passenger) => {
        const passengerUser = await BasicUser.findById(passenger.passenger);
        passengerUser.trips.pull(this._id);
        await passengerUser.save();
      })
    );

    next();
  } catch (error) {
    next(error);
  }
});

const Trip = mongoose.model("Trip", TripSchema);

export default Trip;
