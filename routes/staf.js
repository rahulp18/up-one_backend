import express from "express";
import {
  addStaf,
  deleteStaf,
  getAllStaf,
  getSingleStaf,
  updateStaf,
} from "../controllers/staf.js";
import { CheckShop } from "../middlewares/CheckShopLogin.js";
const routes = express.Router();

routes.post("/", CheckShop, addStaf);
routes.put("/:id", CheckShop, updateStaf);
routes.delete("/:id", CheckShop, deleteStaf);
routes.get("/:id", CheckShop, getSingleStaf);
routes.get("/", CheckShop, getAllStaf);

export default routes;
