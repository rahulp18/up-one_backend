import express from "express";
import {
  addStaf,
  deleteStaf,
  geStafBySalon,
  getActiveStafs,
  getAllStaf,
  getSingleStaf,
  updateStaf,
} from "../controllers/staf.js";
import { CheckShop } from "../middlewares/CheckShopLogin.js";
const routes = express.Router();

routes.post("/", CheckShop, addStaf);
routes.put("/:id", CheckShop, updateStaf);
routes.delete("/:id", CheckShop, deleteStaf);
routes.get("/:id", getSingleStaf);
routes.get("/", CheckShop, getAllStaf);
routes.get("/saloon/active", CheckShop, getActiveStafs);
routes.get("/client/active/:shopId", geStafBySalon);

export default routes;
