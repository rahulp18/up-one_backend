import Shop from "../models/shopModel.js";
import { generateOtp, sendsmsOtp } from "../utils/otp.js";
import { createJwtToken } from "../utils/token.js";
import Cloudinary from "../utils/cloudinary.js";
import { sendSMS } from "../utils/sendSms.js";
export const createShop = async (req, res) => {
  try {
    // console.log(req.body);
    let { phone } = req.body;
    const shop = await Shop.findOne({ number: phone });
    if (shop) {
      return res.status(404).json({ message: "This Number is already used" });
    }
    let images = [...req.body.images];
    let imageBuffer = [];
    console.log(images);
    for (let i = 0; i < images.length; i++) {
      const result = await Cloudinary.uploader.upload(images[i], {
        folder: "shops",
        crop: "scale",
      });
      imageBuffer.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    console.log(imageBuffer);
    req.body.images = imageBuffer;

    const newShop = await Shop({ ...req.body, number: phone });
    await newShop.save();
    const otp = generateOtp(6);
    newShop.phoneOtp = otp;
    await newShop.save();
    // sendsmsOtp({
    //   number: newShop.number,
    //   message: `Your OTP is ${otp}`,
    // });
    sendSMS(
      newShop.number.substring(3, newShop.number.length),
      newShop.number.substring(0, 3),
      otp
    );
    res.status(200).json({
      type: "success",
      message: "Account created OTP sended to mobile number",
      data: {
        userId: newShop._id,
      },
    });
  } catch (error) {
    console.log(error);
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
    // sendsmsOtp({
    //   number: shop.number,
    //   message: `Your OTP is ${otp}`,
    // });
    sendSMS(
      shop.number.substring(3, shop.number.length),
      shop.number.substring(0, 3),
      otp
    );
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
  console.log(req.body);
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
    const shop = await Shop.findById(req.params.shopId);
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

export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json({ type: "success", data: shops });
  } catch (error) {
    res.status(400).json({ type: "error", data: error.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    console.log(req.body);
    const updatedLocation = await Shop.findByIdAndUpdate(
      req.user,
      {
        location: req.body.location,
        geo: {
          lat: req.body.geo.lat,
          lng: req.body.geo.lng,
        },
      },

      { new: true }
    );
    return res.status(200).json({ type: "success", data: updatedLocation });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.user);

    res.status(200).json({ type: "success", data: shop });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
