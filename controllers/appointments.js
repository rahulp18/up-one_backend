import Appointment from "../models/Appointment.js";
import Slot from "../models/slot.js";
import Service from "../models/services.js";

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
    newappointment.save((err, saved) => {
      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) =>
          res.status(200).json({ type: "success", data: appointment })
        );
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ type: "error", message: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appoinemts = await Appointment.findOneAndUpdate(
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
