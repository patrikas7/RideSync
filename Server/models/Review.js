import mongoose, { Schema } from "mongoose";
import BasicUser from "./BasicUser.js";

const ReviewSchema = new Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Trip",
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "BasicUser",
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "BasicUser",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReviewSchema.pre("save", async function (next) {
  try {
    const recipient = await BasicUser.findById(this.recipient);
    const reviewer = await BasicUser.findById(this.reviewer);

    if (recipient && reviewer) {
      recipient.reviews.push(this._id);
      reviewer.reviews.push(this._id);

      await recipient.save();
      await reviewer.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
