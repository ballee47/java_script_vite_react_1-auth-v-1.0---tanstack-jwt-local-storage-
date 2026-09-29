import { env } from "@/config/env";

type CloudinaryUploadResponse = {
  secure_url?: string;
};

export async function uploadImage(file: File): Promise<string> {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } = env;

  if (
    !CLOUDINARY_CLOUD_NAME ||
    !CLOUDINARY_UPLOAD_PRESET ||
    CLOUDINARY_CLOUD_NAME === "your_cloud_name_here" ||
    CLOUDINARY_UPLOAD_PRESET === "your_upload_preset_here"
  ) {
    throw new Error("Cloudinary upload is not configured.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!response.ok) {
    throw new Error("Image upload failed.");
  }

  const data = (await response.json()) as CloudinaryUploadResponse;
  if (!data.secure_url) {
    throw new Error("Cloudinary did not return an image URL.");
  }

  return data.secure_url;
}
