import Shop from "../models/shopModel.js";
import { generateOtp, sendsmsOtp } from "../utils/otp.js";
import { createJwtToken } from "../utils/token.js";

export const createShop = async (req, res) => {
  try {
    let { phone } = req.body;
    const shop = await Shop.findOne({ number: phone });
    if (shop) {
      return res.status(404).json({ message: "This Number is already used" });
    }
    const newShop = await Shop({ ...req.body, number: phone });
    await newShop.save();
    const otp = generateOtp(6);
    newShop.phoneOtp = otp;
    await newShop.save();
    sendsmsOtp({
      number: newShop.number,
      message: `Your OTP is ${otp}`,
    });
    res.status(200).json({
      type: "success",
      message: "Account created OTP sended to mobile number",
      data: {
        userId: newShop._id,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const loginShop = async (req, res) => {
  try {
    const { phone } = req.body;
    const shop = await Shop.findOne({ number: phone });
    if (!shop) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const otp = generateOtp(6);
    shop.phoneOtp = otp;
    await shop.save();
    sendsmsOtp({
      number: shop.number,
      message: `Your OTP is ${otp}`,
    });
    res.status(201).json({
      type: "success",
      message: "OTP sended to registerd mobile phone successfully",
      data: {
        userId: shop._id,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const verifyOtp = async (req, res) => {
  try {
    console.log("Hello");
    const { otp, userId } = req.body;
    console.log(req.body);
    const shop = await Shop.findById(userId);
    console.log(otp);
    if (!shop) {
      return res.status(404).json({ message: "User Not Found" });
    }
    console.log(shop.phoneOtp);
    if (shop.phoneOtp !== otp) {
      return res.status(404).json({ message: "Otp is Invalid" });
    }
    const token = createJwtToken({ userId: shop._id });
    shop.phoneOtp = "";
    await shop.save();

    res.status(200).json({
      type: "success",
      message: "Otp verified",
      data: {
        token,
        userId: shop._id,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.user, req.body, {
      new: true,
    });
    res.status(200).json({ type: "success", data: shop });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getSingleShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.user);
    res.status(200).json({ type: "success", data: shop });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteShop = async (req, res) => {
  try {
    await Shop.findByIdAndDelete(req.params.shopId);
    res.status(200).json({ type: "success", data: "Shop deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateServices = async (req, res) => {
  try {
    const updatedData = await Shop.update(
      { "services._id": req.params.id },
      {
        $set: {
          "services.$.name": req.body?.name,
          "services.$.img": req.body?.img,
          "services.$.price": req.body?.price,
        },
      },
      { new: true }
    );
    res.status(200).json({ type: "success", data: "data updated" });
  } catch (error) {
    res.status(400).json({ type: "error", data: error.message });
  }
};

export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json({ type: "success", data: shops });
  } catch (error) {
    res.status(400).json({ type: "error", data: error.message });
  }
};
