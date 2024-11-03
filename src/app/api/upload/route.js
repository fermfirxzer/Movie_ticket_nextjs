import { NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises"; // Add unlink for deleting files

export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("image");
  const currentImage = formData.get("currentImage"); // Get the current image from the form data
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const originalFilename = file.name.replaceAll(" ", "_");
  const fileExtension = path.extname(originalFilename); // Get file extension
  const filenameWithoutExt = path.basename(originalFilename, fileExtension); 
  const timestamp = Date.now();
  const filename = `${filenameWithoutExt}_${timestamp}${fileExtension}`;

  const uploadDir = path.join(process.cwd(), "public/uploads/");
  const filePath = path.join(uploadDir, filename);

  // If there's a current image, attempt to delete it
  if (currentImage) {
    const oldImagePath = path.join(uploadDir, currentImage);
    try {
      await unlink(oldImagePath); // Delete the old image
      console.log(`Deleted old image: ${currentImage}`);
    } catch (error) {
      console.error("Error deleting old image:", error);
      // Continue with uploading the new image, even if deleting the old one fails
    }
  }
// Proceed with writing the new file
  try {
    await writeFile(filePath, buffer);
    return NextResponse.json({ Message: "Success", imageUrl: filename, status: 201 });
  } catch (error) {
    console.log("Error occurred while uploading new image: ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from 'cloudinary';

// // Configure Cloudinary with your credentials
// cloudinary.config({
//   cloud_name: 'dc1uaed4l',
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const POST = async (req) => {
//   const formData = await req.formData();

//   const file = formData.get("image"); // Get image file from form data
//   const currentImage = formData.get("currentImage"); // Get the current image URL (if any)

//   if (!file) {
//     return NextResponse.json({ error: "No files received." }, { status: 400 });
//   }

//   // Convert the image to buffer  
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const originalFilename = file.name.replaceAll(" ", "_");
//   try {
//     // Upload the file buffer to Cloudinary
//     const result = await cloudinary.uploader.upload_stream(
//       { 
//         folder: "Movie_ticket", // Specify the folder
//         resource_type: 'auto', // Automatically detect the resource type (image, video, etc.)
//         public_id: originalFilename,
//         timeout: 60000,// Set the public_id to the original filename
//       },
//       (error, cloudinaryResult) => {
//         if (error) {
//           console.error("Error uploading to Cloudinary:", error);
//           return NextResponse.json({ error: "Failed to upload to Cloudinary." }, { status: 500 });
//         }

//         // Return the Cloudinary URL
//         return NextResponse.json({
//           message: "Success",
//           imageUrl: cloudinaryResult.secure_url, // Return the Cloudinary URL
//           status: 201,
//         });
//       }
//     );

//     // Write the buffer to the Cloudinary stream
//     buffer.pipe(result);

//   } catch (error) {
//     console.error("Error occurred while uploading to Cloudinary:", error);
//     return NextResponse.json({ message: "Failed to upload to Cloudinary", status: 500 });
//   }
// };
