import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotEnv from "dotenv";
import authRoutes from "./routes/auth.js";
import shopRoutes from "./routes/shop.js";
import userRoutes from "./routes/user.js";
import serviceRoutes from "./routes/services.js";
import stafRoutes from "./routes/staf.js";
import appointmentRoutes from "./routes/appointment.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app = express();
dotEnv.config();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

async function main() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASE connection established");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}!`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

// Handle errors

// Auth Routes

app.use("/api/auth", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/user", userRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/staf", stafRoutes);
app.use("/api", appointmentRoutes);
main();
