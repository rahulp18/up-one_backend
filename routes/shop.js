import express from "express";
import {
  createShop,
  deleteShop,
  getAllShops,
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
routes.get("/", getAllShops);

routes.put("/update", CheckShop, updateShop);
routes.put("/location/update", CheckShop, updateLocation);
routes.get("/:shopId", getSingleShop);
routes.delete("/:shopId", CheckShop, deleteShop);

export default routes;
