import User from "../models/userModel.js";
import { generateOtp, sendsmsOtp } from "../utils/otp.js";
import { sendSMS } from "../utils/sendSms.js";
import { createJwtToken, verifyJwtToken } from "../utils/token.js";

export const registerUser = async (req, res) => {
  try {
    let { phone } = req.body;
    const user = await User.findOne({ number: phone });
    if (user) {
      return res.status(404).json({ message: "This Number is already used" });
    }
    const newUser = await User({ ...req.body, number: phone });
    await newUser.save();

    // GENERATE OTP
    const otp = generateOtp(6);
    newUser.phoneOtp = otp;
    await newUser.save();
    // sendsmsOtp({
    //   number: newUser.number,
    //   message: `Your OTP is ${otp}`,
    // });
    sendSMS(
      newUser.number.substring(3, newUser.number.length),
      newUser.number.substring(0, 3),
      otp
    );
    res.status(200).json({
      type: "success",
      message: "Account created OTP sended to mobile number",
      data: {
        userId: newUser._id,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ number: phone });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const otp = generateOtp(6);
    user.phoneOtp = otp;
    await user.save();
    // sendsmsOtp({
    //   number: user.number,
    //   message: `Your OTP is ${otp}`,
    // });
    sendSMS(
      user.number.substring(3, user.number.length),
      user.number.substring(0, 3),
      otp
    );

    res.status(201).json({
      type: "success",
      message: "OTP sended to registerd mobile phone successfully",
      data: {
        userId: user._id,
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
    const user = await User.findById(userId);
    console.log(otp);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    console.log(user.phoneOtp);
    if (user.phoneOtp !== otp) {
      return res.status(404).json({ message: "Otp is Invalid" });
    }
    const token = createJwtToken({ userId: user._id });
    user.phoneOtp = "";
    await user.save();

    res.status(200).json({
      type: "success",
      message: "Otp verified",
      data: {
        token,
        userId: user._id,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const result = verifyJwtToken(req.params.token);

  if (result === "error") {
    res.status(400).json("Token Expored");
  } else {
    res.status(200).json({ status: "success", message: "Token Valid" });
  }
};
