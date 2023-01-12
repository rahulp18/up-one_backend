import express from "express";
import {
  loginUser,
  registerUser,
  verifyOtp,
  verifyToken,
} from "../controllers/auth.js";

const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.post("/verifyOtp", verifyOtp);
routes.get("/verifyToken/:token", verifyToken);

export default routes;
