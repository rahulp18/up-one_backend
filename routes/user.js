import express from "express";
import { getUser, updateUser } from "../controllers/user.js";
import { checkAuth } from "../middlewares/checkAuth.js";
const routes = express.Router();

routes.put("/update", checkAuth, updateUser);
routes.get("/", checkAuth, getUser);

export default routes;
