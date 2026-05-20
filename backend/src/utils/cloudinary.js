import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (loaclFilePath) => {
  try {
    if (!loaclFilePath) return null;

    // UPload file on cloudinary
    const response = await cloudinary.uploader.upload(loaclFilePath, {
      resource_type: "auto",
    });
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return response;
  } catch (error) {
    fs.unlinkSync(loaclFilePath);
    console.error("Error in Cloudinary: ", error);
    return null;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId, {
        resource_type: "auto"
    });
    return response;
  } catch (error) {
    console.log("Error while deleting from cloudinary:", error);
    return null;
  }
};
