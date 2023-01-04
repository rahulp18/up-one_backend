import express from "express";
import {
  createShop,
  deleteShop,
  getAllShops,
  getSingleShop,
  loginShop,
  updateServices,
  updateShop,
  verifyOtp,
} from "../controllers/shop.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const routes = express.Router();

routes.post("/register", createShop);
routes.post("/login", loginShop);
routes.post("/verifyOtp", verifyOtp);
routes.get("/", getAllShops);
routes.put("/services/:id", checkAuth, updateServices);
routes.put("/:shopId", checkAuth, updateShop);
routes.get("/:shopId", checkAuth, getSingleShop);
routes.delete("/:shopId", checkAuth, deleteShop);

export default routes;
