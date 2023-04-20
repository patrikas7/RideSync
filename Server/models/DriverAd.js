import mongoose, { Schema } from "mongoose";
import BusinessUser from "./BusinessUser.js";

const DriverAdSchema = new Schema({
  driver: {
    type: Schema.Types.ObjectId,
    ref: "BusinessUser",
    required: true,
  },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  isActive: {
    type: Boolean,
    default: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },
});

DriverAdSchema.pre("save", async function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  try {
    const user = await BusinessUser.findById(this.driver);
    if (user) {
      user.driverAds.push(this._id);
      await user.save();
    }
  } catch (error) {
    next(error);
  }
});

const DriverAd = mongoose.model("DriverAd", DriverAdSchema);

export default DriverAd;
