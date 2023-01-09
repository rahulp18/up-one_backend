import Staf from "../models/stafModel.js";
import Cloudinary from "../utils/cloudinary.js";
export const addStaf = async (req, res) => {
  try {
    const result = await Cloudinary.uploader.upload(req.body.image, {
      folder: "stafs",
      crop: "scale",
    });
    const newStaf = await Staf({
      ...req.body,
      name: req.body.name,
      image: result.secure_url,
      shopId: req.user,
    });
    await newStaf.save();
    res.status(200).json({ type: "success", data: newStaf });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateStaf = async (req, res) => {
  try {
    const updatedStaf = await Staf.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ type: "success", data: updatedStaf });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteStaf = async (req, res) => {
  try {
    await Staf.findOneAndDelete(req.params.id);
    res.status(200).json({ type: "success", message: "Deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getSingleStaf = async (req, res) => {
  try {
    const staf = await Staf.findById(req.params.id);
    res.status(200).json({ type: "success", data: staf });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getAllStaf = async (req, res) => {
  try {
    const staf = await Staf.find({ shopId: req.user });
    res.status(200).json({ type: "success", data: staf });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
