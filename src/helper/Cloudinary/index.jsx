import { CLOUDINARY_PRESET, CLOUDINARY_NAME } from "@env";

export const cloudinaryUpload = async (photo) => {
	const data = new FormData();
	data.append("file", photo);
	data.append("upload_preset", CLOUDINARY_PRESET);
	data.append("cloud_name", CLOUDINARY_NAME);

	try {
		const res = await fetch(
			`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
			{
				method: "POST",
				body: data,
			}
		);
		const file = await res.json();
		return file.secure_url;
	} catch (error) {
		alert("Error uploading image");
	}
}