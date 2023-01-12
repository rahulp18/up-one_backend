import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
    slots: { type: mongoose.Types.ObjectId, ref: "Slot" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    shopId: {
      type: mongoose.Types.ObjectId,
      ref: "Shop",
    },
    services: {
      type: Array,
      default: [],
    },
    stafId: {
      type: mongoose.Types.ObjectId,
      ref: "Staf",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Appointment", appointmentSchema);
