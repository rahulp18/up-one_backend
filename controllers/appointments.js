import Appointment from "../models/Appointment.js";
import Slot from "../models/slot.js";
import Service from "../models/services.js";
import User from "../models/userModel.js";
import Shop from "../models/shopModel.js";
import { sendConfirmSms } from "../utils/sendSms.js";
import { sendsmsOtp } from "../utils/otp.js";

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      status: req.params.status,
      shopId: req.user,
    });
    res.status(200).json({ type: "success", data: appointments });
  } catch (error) {
    console.log(error);
    res.status(404).json({ type: "error", message: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    var requestBody = req.body;
    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      shopId: requestBody.shopId,
    });
    await newslot.save();
    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: newslot._id,
      shopId: requestBody.shopId,
      services: requestBody.services,
      stafId: requestBody.stafId,
      userId: requestBody.userId,
    });
    const shopUser = await Shop.findById(requestBody.shopId);

    newappointment.save((err, saved) => {
      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) =>
          res.status(200).json({ type: "success", data: appointment })
        );
    });
    sendsmsOtp({
      number: shopUser.number,
      message: `Check your Appointment Request someone book a new appointment`,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ type: "error", message: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    console.log(req.body, req.params.id);
    const appoinemts = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({ type: "Success", data: appoinemts });
  } catch (error) {
    res.status(200).json(error.message);
  }
};

export const getAllAppCli = async (req, res) => {
  console.log(req.user);
  try {
    const data = await Appointment.find({ userId: req.user });
    res.status(200).json({ type: "success", data: data });
  } catch (error) {
    res.status(200).json(error.message);
  }
};

export const addManully = async (req, res) => {
  try {
    const data = await User.findOne({ number: req.body.phone });
    console.log(data);
    var requestBody = req.body;
    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      shopId: requestBody.shopId,
    });
    await newslot.save();
    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: newslot._id,
      shopId: req.user,
      services: requestBody.services,
      stafId: requestBody.stafId,
      userId: data ? data._id : null,
    });
    newappointment.save((err, saved) => {
      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) =>
          res.status(200).json({ type: "success", data: appointment })
        );
    });

    sendConfirmSms(
      data.number.substring(3, data.number.length),
      data.number.substring(0, 3),
      "Congratulations your appointment request has been successfully submitted"
    );
  } catch (error) {
    console.log(error);
    res.status(404).json({ type: "error", message: error.message });
  }
};

export const getSlotInfo = async (req, res) => {
  try {
    const data = await Slot.findById(req.params.id);
    res.status(200).json({ type: "success", data: data });
  } catch (error) {
    res.status(404).json({ type: "error", message: error.message });
  }
};
