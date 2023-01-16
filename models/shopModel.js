import mongoose from "mongoose";

const shopModel = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    number: {
      type: String,
      required: [true, "Number must be provided"],
      unique: [true, "Number must be unique"],
    },
    phoneOtp: String,
    images: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    overview: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("Shop", shopModel);

export default Shop;
