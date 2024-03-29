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
    url: String,
    public_id: String,
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
  },
});

export default mongoose.model("Service", serviceSchema);
