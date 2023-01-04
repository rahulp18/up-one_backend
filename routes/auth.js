import express from "express";
import { loginUser, registerUser, verifyOtp } from "../controllers/auth.js";

const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.post("/verifyOtp", verifyOtp);

export default routes;
