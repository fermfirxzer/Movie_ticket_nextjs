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
