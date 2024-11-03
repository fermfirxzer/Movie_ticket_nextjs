import { NextResponse } from "next/server";
export const GET=async(req,res)=>{
    return NextResponse.json({ Message: "Success", status: 200 });
}