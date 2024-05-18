import mongoose from "mongoose";
import { generateActivationCode } from "../utils/utils.js";
import { UserRoles } from "../utils/enums.js";

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: Object.values(UserRoles),
    required: true,
    default: UserRoles.USER
  },
  universityName: {
    type: String,
    required: false,
    trim: true
  },
  year: {
    type: Number,
    required: false,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: false
  },
  location: {
    type: String,
    required: false,
    trim: true
  },
  isActivated: {
    type: Boolean,
    required: true,
    default: false
  },
  activationCode: {
    type: String,
    required: false,
    default: generateActivationCode()
  }
});

export default mongoose.model("User", UserSchema);
