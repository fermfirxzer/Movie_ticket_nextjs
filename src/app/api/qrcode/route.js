import { connectMongoDB } from "@/../lib/mongodb.js"; // Ensure you have a utility to connect to MongoDB

import { History } from "@/../lib/model/history";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try { await connectMongoDB();
    const body = await req.json();
    console.log(body)
    const { history_id } = body.data;
    const history = await History.findOne({ _id: history_id });
    if (!history) {
      return NextResponse.json({ Message: "History entry not found." }, { status: 404 }); // Handle case where history entry does not exist
    }
    if (history.qrcode_isscan) {
      return NextResponse.json({ Message: "QR code has already been scanned!" }, { status: 400 }); 
    }
    history.qrcode_isscan=true;
    await history.save();
    return NextResponse.json({ Message: `Qrcode Scan Successfully for ${history_id}`}, { status: 200 });// Valid and now scanned
  } catch (error) {
    console.log(error)
    return NextResponse.json({ Message: "Error in Qrcode"}, { status: 400 }); // Error handling
  }
}
