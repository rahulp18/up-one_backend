import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    slot_time: {
      type: String,
      required: true,
    },
    slot_date: {
      type: String,
      required: true,
    },
    shopId: { type: mongoose.Types.ObjectId, ref: "Shop" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Slot", slotSchema);
