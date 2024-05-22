import mongoose from "mongoose";

const AmentiesSchema = new mongoose.Schema(
  {
    hasTelevision: {
      type: Boolean,
      required: true,
      default: false
    },
    hasWiFi: {
      type: Boolean,
      required: true,
      default: false
    },
    hasWasher: {
      type: Boolean,
      required: true,
      default: false
    },
    hasBalcony: {
      type: Boolean,
      required: true,
      default: false
    },
    hasCleaner: {
      type: Boolean,
      required: true,
      default: false
    },
    hasRadio: {
      type: Boolean,
      required: true,
      default: false
    },
    hasLift: {
      type: Boolean,
      required: true,
      default: false
    },
    hasDailyCleaner: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { _id: false, timestamps: false }
);

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
    city: {
      type: String,
      required: true,
      trim: true
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
    isHostel: {
      type: Boolean,
      required: true,
      default: false
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
    managers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
      default: []
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
      required: true,
      default: []
    },
    amenties: {
      type: AmentiesSchema,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Dorm", DormSchema);
