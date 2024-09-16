import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../lib/model/user";
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        const { username , password , name , email } = await req.json();
        const hashPassword = await bcrypt.hash(password , 10);

        await connectMongoDB();
        await User.create({ username , password : hashPassword , name , email })

        return NextResponse.json({ message : "Register Complete" } , { status : 201});
        
    } catch (error) {
        return NextResponse.json({ message : "Error to Register" } , { status : 500 })
    }
}