import mongoose from "mongoose";

const stafSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  number: String,
  experience: String,
  shopId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Shop",
  },
  skills: {
    type: [String],
    required: true,
    trim: true,
    default: [],
  },
  status: {
    type: String,
    enum: ["working", "leave"],
    trim: true,
    default: "working",
  },
});

export default mongoose.model("Staf", stafSchema);
