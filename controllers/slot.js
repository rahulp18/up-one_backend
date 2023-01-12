import Appointment from "../models/Appointment.js";
import Slot from "../models/slot.js";

export const slotController = async (req, res) => {
  try {
    console.log(req.body.date);
    const slots = await Slot.find({
      shopId: req.params.shopId,
      slot_date: req.body.date,
    });
    console.log(slots);
    res.status(200).json({ type: "success", data: slots });
  } catch (error) {
    res.status(200), json({ type: "error", message: error.message });
  }
};
