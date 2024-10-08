import { NextResponse } from "next/server";
import { connectMongoDB } from "@/../lib/mongodb.js";
import User from "../../../../lib/model/user";
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        const { username , password , email } = await req.json();
        const hashPassword = await bcrypt.hash(password , 10);

        await connectMongoDB();

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return NextResponse.json({ message: "Username or Email already exists" }, { status: 400 });
        }

        await User.create({ username , password : hashPassword , email })

        return NextResponse.json({ message : "Register Complete" } , { status : 201});
        
    } catch (error) {
        return NextResponse.json({ message : "Error to Register" } , { status : 500 })
    }
}