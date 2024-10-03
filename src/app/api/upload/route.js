import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("image");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const originalFilename = file.name.replaceAll(" ", "_");
  const fileExtension = path.extname(originalFilename); // Get file extension
  const filenameWithoutExt = path.basename(originalFilename, fileExtension); 
  const timestamp = Date.now();
  
  const filename = `${filenameWithoutExt}_${timestamp}${fileExtension}`;
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
    return NextResponse.json({ Message: "Success",imageUrl:filename, status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};