import User from "../models/userModel.js";

export const updateUser = async (req, res) => {
  try {
    const updatedData = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
    });
    res.status(200).send({
      type: "success",
      data: updatedData,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.status(200).json({ type: "success", data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
