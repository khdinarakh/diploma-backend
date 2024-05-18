import mongoose from "mongoose";

const DormSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    workEmail: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    extras: {
      type: [String],
      required: true
    },
    hasWiFi: {
      type: Boolean,
      required: true,
      default: true
    },
    hasMeal: {
      type: Boolean,
      required: true,
      default: true
    },
    previewImageUrl: {
      type: String,
      required: true,
      trim: true
    },
    imageUrls: {
      type: [String],
      required: true
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
      required: true,
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Dorm", DormSchema);
