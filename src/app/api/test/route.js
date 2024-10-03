import { NextResponse } from "next/server";
import { connectMongoDB } from "@/../lib/mongodb.js";

export async function GET(req) {
    console.log("This is test api")
    try {
        // await connectMongoDB();
        return NextResponse.json({ message: "Register Complete" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Error to Register" }, { status: 500 })
    }
}