import { Schema } from "mongoose";
import User from "./User.js";

const BusinessUserSchema = new Schema({});

const BusinessUser = User.discriminator("BusinessUser", BusinessUserSchema);

export default BusinessUser;
