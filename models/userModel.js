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
    image: {
      url: String,
      public_id: String,
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
      type: String,
    },
    geo: {
      lat: Number,
      lng: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
