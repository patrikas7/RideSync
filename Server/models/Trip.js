import mongoose, { Schema } from "mongoose";
import { sendNotificationsForPassengers } from "../controllers/NotificationController.js";
import { NotificationTypes } from "../enums/enums.js";
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

TripSchema.pre("findOneAndUpdate", async function (next) {
  const trip = await this.model.findOne(this.getQuery());

  try {
    await sendNotificationsForPassengers(
      trip.passengers,
      NotificationTypes.TRIP_WAS_EDITED,
      trip.driver,
      trip._id
    );
    next();
  } catch (error) {
    next(error);
  }
});

TripSchema.pre("findOneAndDelete", async function (next) {
  try {
    const trip = await Trip.findOne({ _id: this.getFilter()._id });
    const user = await BasicUser.findById(trip.driver);
    user.trips.pull(trip._id);
    await user.save();

    await sendNotificationsForPassengers(
      trip.passengers,
      NotificationTypes.TRIP_WAS_CANCELED,
      trip.driver,
      trip
    );

    await Promise.all(
      trip.passengers.map(async (passenger) => {
        const passengerUser = await BasicUser.findById(passenger.passenger);
        passengerUser.trips.pull(trip._id);
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
