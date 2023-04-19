import { Schema } from "mongoose";
import User from "./User.js";

const BusinessUserSchema = new Schema({
  driverAds: [{ type: Schema.Types.ObjectId, ref: "DriverAd", required: true }],
});

const BusinessUser = User.discriminator("BusinessUser", BusinessUserSchema);

export default BusinessUser;
