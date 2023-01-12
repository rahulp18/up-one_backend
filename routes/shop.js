import express from "express";
import {
  createShop,
  deleteShop,
  getAllShops,
  getShop,
  getSingleShop,
  loginShop,
  updateLocation,
  updateShop,
  verifyOtp,
} from "../controllers/shop.js";
import { CheckShop } from "../middlewares/CheckShopLogin.js";

const routes = express.Router();

routes.post("/register", createShop);
routes.post("/login", loginShop);
routes.post("/verifyOtp", verifyOtp);
routes.get("/allShop", getAllShops);
routes.put("/update", CheckShop, updateShop);
routes.put("/location/update", CheckShop, updateLocation);
routes.get("/:shopId", getSingleShop);
routes.get("/", CheckShop, getShop);
routes.delete("/:shopId", CheckShop, deleteShop);

export default routes;
