import mongoose, { Schema } from "mongoose";

const TripSchema = new Schema({
  departureCity: { type: String, required: true },
  destinationCity: { type: String, required: true },
  date: { type: Date, required: true },
  personsCount: { type: Number },
  driver: { type: Schema.Types.ObjectId, ref: "basicUser" },
});

const Trip = mongoose.model("Trip", TripSchema);

export default Trip;
