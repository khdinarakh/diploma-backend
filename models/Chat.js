import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true
    },
    isManager: {
      type: Boolean,
      required: true
    },
    isSeen: {
      type: Boolean,
      required: true,
      default: true
    },
    fileUrl: {
      type: String,
      required: false
    }
  },
  { _id: false, timestamps: true }
);

const ChatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    dormId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dorm",
      required: true
    },
    messages: {
      type: [MessageSchema],
      required: true,
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
