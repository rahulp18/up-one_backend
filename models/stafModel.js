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
});

export default mongoose.model("Staf", stafSchema);
