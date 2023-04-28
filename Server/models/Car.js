import mongoose, { Schema } from "mongoose";
import User from "./User.js";

const CarSchema = new Schema({
  manufacturer: { type: String, maxlength: 50, required: true },
  model: { type: String, maxlength: 10, required: true },
  licensePlateNumber: { type: String, maxlength: 7, required: true },
  type: { type: String, maxlength: 20, required: true },
  manufactureYear: { type: Number, required: true },
  ownwer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CarSchema.pre("save", async function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  try {
    const user = await User.findById(this.ownwer);
    if (user) {
      user.cars.push(this._id);
      await user.save();
    }
  } catch (error) {
    next(error);
  }
});

const Car = mongoose.model("Car", CarSchema);

export default Car;
