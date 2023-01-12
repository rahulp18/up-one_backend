import Cloudinary from "./cloudinary.js";

export const upload = async (folder, image) => {
  const result = await Cloudinary.uploader.upload(image, {
    folder: folder,
    crop: "scale",
  });
  return result;
};
