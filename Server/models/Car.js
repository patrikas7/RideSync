import mongoose, { Schema } from "mongoose";

const CarSchema = new Schema({
  manufacturer: { type: String, required: true },
  model: { type: String, required: true },
  licensePlateNumber: { type: String, required: true },
  type: { type: String, required: true },
  manufactureYear: { type: Number, required: true },
  ownwer: {
    type: Schema.Types.ObjectId,
    ref: "BasicUser",
    required: true,
  },
});

const Car = mongoose.model("Car", CarSchema);

export default Car;
