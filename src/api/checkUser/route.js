import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../lib/model/user";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { username , email } = await req.json();
        const usernameCheck = await User.findOne({ username }).select("_id");
        const emailCheck = await User.findOne({ email }).select("_id")

        return NextResponse.json({ message : "Register Complete" } , { status : 201});
        
    } catch (error) {
        return NextResponse.json({ message : "Error to Register" } , { status : 500 })
    }
}