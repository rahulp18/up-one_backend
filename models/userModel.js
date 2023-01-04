import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name must be provided"],
    },
    number: {
      type: String,
      required: [true, "Number must be provided"],
      unique: [true, "Number must be unique"],
    },
    profileImage: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "SHOP"],
      default: "USER",
    },
    phoneOtp: String,
    location: {
      lat: String,
      lng: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
