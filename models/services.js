import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  saloon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salon",
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("Service", serviceSchema);
