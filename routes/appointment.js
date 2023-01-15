import express from "express";
import { CheckShop } from "../middlewares/CheckShopLogin.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import {
  addManully,
  createAppointment,
  getAllAppCli,
  getAppointments,
  getSlotInfo,
  updateAppointment,
} from "../controllers/appointments.js";
import { slotController } from "../controllers/slot.js";

const router = express.Router();
router.get("/appointments/:status", CheckShop, getAppointments);
router.get("/appointments", checkAuth, getAllAppCli);
router.post("/retriveSlots/:shopId", slotController);
router.post("/appointmentCreate", createAppointment);
router.put("/appointments/update/:id", updateAppointment);
router.post("/appointments/slef/add", CheckShop, addManully);
router.get("/slotsInfo/:id", getSlotInfo);

export default router;
