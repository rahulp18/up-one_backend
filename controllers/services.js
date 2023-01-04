import Service from "../models/services.js";

export const createService = async (req, res) => {
  try {
    const newService = await Service.create({ ...req.body, saloon: req.user });
    res.status(201).json({ type: "success", data: newService });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ saloon: req.user });
    res.status(200).json({ type: "success", data: services });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({ type: "success", data: services });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getSingleService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.status(200).json({ type: "success", data: service });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateService = async (req, res) => {
  try {
    const updateService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ type: "success", data: updateService });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ type: "success", data: "deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPtrlSaloon = async (req, res) => {
  try {
    const services = await Service.find({ saloon: req.params.id });
    res.status(200).json({ type: "success", data: services });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
