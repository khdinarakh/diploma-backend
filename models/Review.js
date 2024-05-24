import mongoose from "mongoose";

const RateSchema = new mongoose.Schema(
  {
    room: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    location: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    building: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    bathroom: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  },
  { _id: false, timestamps: false }
);

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    rate: {
      type: RateSchema,
      required: true
    },
    comment: {
      type: String,
      required: false,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
