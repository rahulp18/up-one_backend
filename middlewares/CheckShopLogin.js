import Shop from "../models/shopModel.js";
import { verifyJwtToken } from "../utils/token.js";

export const CheckShop = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(400).json({ message: "header is not present" });
    }
    const token = header.split("Bearer ")[1];

    if (!token) {
      return res.status(400).json({ message: "token is not present" });
    }
    const userId = verifyJwtToken(token);

    if (!userId) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = await Shop.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
