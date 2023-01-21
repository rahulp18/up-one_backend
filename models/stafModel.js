import mongoose from "mongoose";

const stafSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    url: String,
    public_id: String,
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
  public_id: String,
});

export default mongoose.model("Staf", stafSchema);
