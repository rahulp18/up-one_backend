import express from "express";
import {
  createService,
  deleteService,
  fetchServiceOfCompany,
  getAllServices,
  getPtrlSaloon,
  getServices,
  getSingleService,
  updateService,
} from "../controllers/services.js";

import { CheckShop } from "../middlewares/CheckShopLogin.js";
const routes = express.Router();

routes.post("/", CheckShop, createService);
routes.get("/saloon", CheckShop, getServices);
routes.get("/client/:id", getPtrlSaloon);
routes.get("/:id", getSingleService);
routes.get("/", getAllServices);
routes.put("/:id", CheckShop, updateService);
routes.delete("/:id", CheckShop, deleteService);
routes.get("/saloon/active", CheckShop, fetchServiceOfCompany);

export default routes;
