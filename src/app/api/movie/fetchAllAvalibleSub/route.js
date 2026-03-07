import { connectMongoDB } from "@/../lib/mongodb";
import { avaliblesub } from "../../../../../lib/model/avaliblecontent.js";
import { NextResponse } from "next/server";
export async function GET(req) {
    try {
        await connectMongoDB();
        const avalible_sub = await avaliblesub.find({Sub:{$exists:true}}).select({Sub:1,_id:0});
        const avalible_age = await avaliblesub.find({Age:{$exists:true}}).select({Age:1,_id:0});
        return NextResponse.json({ sub:avalible_sub,age:avalible_age }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ Message: "Failed to fetch Avalible Sub for Movie" }, { status: 500 })
    }
}