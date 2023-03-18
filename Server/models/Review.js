import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Trip",
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "BasicUser",
  },
  reviewerId: {
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

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
